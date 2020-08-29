import path from 'path'
import readline from 'readline'

import { isFloat, isInteger } from '@devnetic/utils'

import { format } from './format'

interface Answers {
  [key: string]: string
}

interface Example {
  color: string
  description: string
  text: string
}

interface Message {
  color: string
  text: string
}

interface Messages {
  epilog: Message | undefined
  examples: Example[]
  options: Option[]
  usage: Message
}

interface Option {
  color: string
  description: string
  params: string[]
}

interface Question {
  message: string
  name: string
  type: string
}

interface Cli {
  askQuestion(message: string): Promise<string>
  epilog(text: string, color?: string): Cli
  example(text: string, description: string, color?: string): Cli
  getParams(params?: string[]): Record<string, string>
  option(params: string[], description: string, color?: string): Cli
  prompt(questions: Question[]): Promise<Answers>
  show(): void
  usage(text?: string, color?: string): Cli
}

type Params = Record<string, string>

const DEFAULT_COLOR: string = 'white'
export const messages: Messages = {
  // epilog: { color: '', text: '' },
  epilog: undefined,
  examples: [],
  options: [],
  usage: { color: '', text: '' }
}

/**
 * Ask a question to the user
 *
 * @param {Interface} interface
 * @param {string} message
 * @returns {Promise<string>}
 */
export const askQuestion = async (message: string): Promise<string> => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return await new Promise((resolve) => {
    readlineInterface.question(message, (answer: string) => {
      readlineInterface.close()

      resolve(answer)
    })
  })
}

/**
 *
 * @param {string} text
 * @param {string} color
 * @returns {object}
 */
export const epilog = (text: string, color: string = DEFAULT_COLOR): Cli => {
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
export const example = (text: string, description: string, color: string = DEFAULT_COLOR): Cli => {
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
const getBoolean = (value: any): boolean => {
  if (['true', 'yes', '1', true, 1].includes(value)) {
    return true
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
export const getParams = (options: string[] = process.argv.slice(2)): Params => {
  const params: Params = {}

  // Is a better idea to declare the variable outside the loop
  let param: any
  while (options.length > 0) {
    param = options.shift()

    if (param.includes('=') === true) {
      const [name, value] = param.split('=')

      setParamValue(params, name, getValue(value))
    } else {
      if (param.startsWith('-') === true || param.startsWith('--') === true) {
        setParamValue(params, param, getValues(options))
      }
    }
  }

  return params
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

  // Is a better idea to declare the variable outside the loop
  let param: any
  while (params.length > 0) {
    param = params.shift()

    if (param.startsWith('-') === true || param.startsWith('--') === true) {
      params.unshift(param)

      break
    }

    values.push(getValue(param))
  }

  return values.length === 1 ? values[0] : values.length > 0 ? values : true
}

/**
 * Check if the given value is a Boolean
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isBoolean = (value: any): boolean => {
  if (['true', 'false', '1', '0', 'yes', 'no', true, false, 1, 0].includes(value)) {
    return true
  }

  return false
}

/**
 * Generate an option in the usage message
 *
 * @param {string[]} params
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
export const option = (params: string[], description: string, color: string = DEFAULT_COLOR): Cli => {
  messages.options.push({ params, description, color })

  return cli
}

/**
 * Show a list of questions to the user and get the answers
 *
 * @param {Question[]} questions
 * @returns {string[]}
 */
export const prompt = async (questions: Question[]): Promise<Answers> => {
  const answers: Answers = {}

  process.stdin.resume()

  for (const question of questions) {
    const answer = await askQuestion(question.message)

    answers[question.name] = answer
  }

  return answers
}

const setParamValue = (params: Params, name: string, value: any): Params => {
  const isShortcut: boolean = !name.startsWith('--')

  params[name.slice(isShortcut ? 1 : 2)] = value

  return params
}

/**
 * Show the usage message to the console
 */
export const show = (): void => {
  console.log(showUsage())
  console.log(showOptions())
  console.log(showExample())
  console.log(showEpilog())
}

/**
 * Show the epilog message in the console
 *
 */
const showEpilog = (): string => {
  if (messages.epilog === undefined) {
    return ''
  }

  return Reflect.get(format, messages.epilog.color)(`\n${messages.epilog.text}`)
}

/**
 * Show the example messages in the console
 *
 */
const showExample = (): string => {
  const lines: string[] = []

  if (messages.examples.length > 0) {
    lines.push(format.white('\nExamples:\r'))
  }

  messages.examples.forEach((message) => {
    lines.push(Reflect.get(format, message.color)(`  ${message.text}  ${message.description}`))
  })

  return lines.join('')
}

/**
 * Show the option messages in the console
 *
 */
const showOptions = (): string => {
  const lines: string[] = []

  if (messages.options.length > 0) {
    lines.push(format.white('\nOptions:\r'))

    messages.options.forEach((message) => {
      lines.push(Reflect.get(format, message.color)(`  ${message.params.join(', ')}  ${message.description}`))
    })
  }

  return lines.join('\r\n')
}

/**
 * Show the usage message in the console
 *
 */
const showUsage = (): string => {
  const usage: string = `${format.white('\r')}${Reflect.get(format, messages.usage.color)(`\r${messages.usage.text}`) as string}`

  return usage
}

/**
 *
 * @param {string} text
 * @param {string} color
 */
export const usage = (text: string = '', color: string = DEFAULT_COLOR): Cli => {
  text = text.replace('$0', path.basename(process.argv[1]))

  messages.usage = { text, color }

  return cli
}

const cli: Cli = {
  askQuestion,
  epilog,
  example,
  getParams,
  option,
  prompt,
  show,
  usage
}
