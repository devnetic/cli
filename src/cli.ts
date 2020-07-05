import path from 'path'
import readline, { Interface } from 'readline'

import { isFloat, isInteger } from '@devnetic/utils'

import { format } from './format'
import { getColor } from './colors'
import { isBoolean } from './utils'

interface Answers {
  [key: string]: string
}

interface Question {
  message: string
  name: string
  type: string
}

interface Message {
  color: string
  text: string
}

interface Example {
  color: string
  description: string
  text: string
}

interface Option {
  color: string
  description: string
  params: string[]
}

interface Messages {
  epilog: Message
  examples: Example[]
  options: Option[]
  usage: Message
}

interface Cli {
  epilog(text: string, color?: string): Cli
  example(text: string, description: string, color?: string): Cli
  getParams(params?: string[]): Record<string, string>
  option(params: string[], description: string, color?: string): Cli
  prompt(questions: Question[]): Promise<Answers>
  show(): void
  usage(text?: string, color?: string): Cli
}

type Params = Record<string, string>

const rlInterface: Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const DEFAULT_COLOR: string = 'white'
const messages: Messages = {
  epilog: { color: '', text: '' },
  examples: [],
  options: [],
  usage: { color: '', text: '' }
}
// const PARAM_REGEX = /-{1,2}([a-z]+)[=|\s]*([a-z0-9\s"'/.]*)/

/**
 * Ask a question to the user
 *
 * @param {Interface} interface
 * @param {string} message
 * @returns {Promise<string>}
 */
const askQuestion = (rlInterface: Interface, message: string): Promise<string> => {
  return new Promise(resolve => rlInterface.question(message, answer => resolve(answer)))
}

/**
 *
 * @param {string} text
 * @param {string} color
 * @returns {object}
 */
const epilog = (text: string, color: string = DEFAULT_COLOR): Cli => {
  messages.epilog = { text, color }

  return cli
}

/**
 *  Generate an example in the usage message
 *
 * @param {string} text
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
const example = (text: string, description: string, color: string = DEFAULT_COLOR): Cli => {
  text = text.replace('$0', path.basename(process.argv[1]))

  messages.examples.push({ text, description, color })

  return cli
}

/**
 * Get the Boolean representation of the given value
 *
 * @param {*} value
 * @returns {Boolean}
 */
const getBoolean = (value: any): Boolean => {
  if (['true', 'yes', '1', true, 1].includes(value)) {
    return true
  } else if (['false', 'no', '0', false, 0].includes(value)) {
    return false
  }

  return false
}

/**
 * Parse the given params and return a object with a representation of the
 * params with the values.
 *
 * @param {string[]} options
 * @returns {object}
 */
const getParams = (options: string[] = process.argv.slice(2) || []): Params => {
  const params: Params = {}

  // Is a better idea to declara the variable outside the loop
  let param: any
  while (options.length > 0) {
    param = options.shift()

    if (param.includes('=')) {
      const [name, value] = param.split('=')

      setParamValue(params, name, getValue(value))
    } else {
      if (param.startsWith('-') || param.startsWith('--')) {
        setParamValue(params, param, getValues(options))
      }
    }
  }

  return params

  // return options.reduce((params: Params, option, index: number) => {
  //   if (option.includes('=')) {
  //     const [name, value] = option.split('=')

  //     setParamValue(params, name, getValue(value))
  //   } else {
  //     if (option.startsWith('-') || option.startsWith('--')) {
  //       setParamValue(params, option, getValues(options.slice(index + 1)))
  //     }
  //   }

  //   return params
  // }, {})
  // const params: Params = {}

  // for (const option of options) {
  //   if (option.includes('=')) {
  //     const [name, value] = option.split('=')

  //     setParamValue(params, name, getValue(value))
  //   } else {
  //     if (option.startsWith('-') || option.startsWith('--')) {
  //       setParamValue(params, option, getValues(options))
  //     }
  //   }
  // }

  // return params
}

/**
 * Get the real value from the given param
 *
 * @param {*} value
 * @returns {*}
 */
const getValue = (value: any): any => {
  if (isInteger(value)) {
    return parseInt(value, 10)
  } else if (isFloat(value)) {
    return parseFloat(value)
  } else if (isBoolean(value)) {
    return getBoolean(value)
  }

  return value
}

/**
 * Get the params values.  If the param have a list of values the function
 * return and array with all the values, otherwise return a single value.
 *
 * @param {string[]} params
 * @param {*} initial
 * @returns {array|*}
 */
const getValues = (params: string[]): any[] => {
  const values: any[] = []

  // Is a better idea to declara the variable outside the loop
  let param: any
  while (params.length > 0) {
    param = params.shift()

    if (param.startsWith('-') || param.startsWith('--')) {
      params.unshift(param)

      break
    }

    values.push(getValue(param))
  }

  // for (const param of params) {
  //   if (param.startsWith('-') || param.startsWith('--')) {
  //     params.unshift(param)

  //     break
  //   }

  //   values.push(getValue(param))
  // }

  return values.length === 1 ? values[0] : values.length > 0 ? values : true
}

/**
 * Generate an option in the usage message
 *
 * @param {string[]} params
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
const option = (params: string[], description: string, color: string = DEFAULT_COLOR): Cli => {
  messages.options.push({ params, description, color })

  return cli
}

/**
 * Show a list of questions to the user and get the answers
 *
 * @param {Question[]} questions
 * @returns {string[]}
 */
const prompt = async (questions: Question[]): Promise<Answers> => {
  const answers: Answers = {}

  for (const question of questions) {
    const answer = await askQuestion(rlInterface, question.message)

    answers[question.name] = answer
  }

  rlInterface.close()

  return answers
}

const setParamValue = (params: Params, name: string, value: any): Params => {
  const isShortcut: Boolean = !name.startsWith('--')

  params[name.slice(isShortcut ? 1 : 2)] = value

  return params
}

/**
 * Show the usage message to the console
 */
const show = (): void => {
  showUsage()
  showOptions()
  showExample()
  showEpilog()
}

/**
 * Show the epilog message in the console
 *
 */
const showEpilog = () => {
  if (!messages.epilog) {
    return
  }

  // console.log(format[messages.epilog.color](`\n${messages.epilog.text}`))
  console.log(Reflect.get(format, messages.epilog.color)(`\n${messages.epilog.text}`))
}

/**
 * Show the example messages in the console
 *
 */
const showExample = () => {
  if (messages.examples.length > 0) {
    console.log(format.white('\nExamples:\r'))
  }

  messages.examples.forEach((message) => {
    // console.log(format[message.color](`  ${message.text}  ${message.description}`))
    console.log(Reflect.get(format, message.color)(`  ${message.text}  ${message.description}`))
  })
}

/**
 * Show the option messages in the console
 *
 */
const showOptions = () => {
  if (messages.options.length > 0) {
    console.log(format.white('\nOptions:\r'))

    messages.options.forEach((message) => {
      // console.log(format[message.color](`  ${message.params.join(', ')}  ${message.description}`))
      console.log(Reflect.get(format, message.color)(`  ${message.params.join(', ')}  ${message.description}`))
    })
  }
}

/**
 * Show the usage message in the console
 *
 */
const showUsage = () => {
  const usage = format.white('\r')
    + Reflect.get(format, messages.usage.color)(`\r${messages.usage.text}`)

  // getColor(messages.usage.color)

  console.log(usage)
}

/**
 *
 * @param {string} text
 * @param {string} color
 */
const usage = (text: string = '', color: string = DEFAULT_COLOR): Cli => {
  text = text.replace('$0', path.basename(process.argv[1]))

  messages.usage = { text, color }

  return cli
}

export const cli: Cli = {
  epilog,
  example,
  getParams,
  option,
  prompt,
  show,
  usage
}
