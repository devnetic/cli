const path = require('path')
const readline = require('readline')

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const { format } = require('./format')
const { isBoolean, isFloat, isInteger } = require('./utils')

const DEFAULT_COLOR = 'white'
const messages = {
  epilog: undefined,
  examples: [],
  options: []
}
// const PARAM_REGEX = /-{1,2}([a-z]+)[=|\s]*([a-z0-9\s"'/.]*)/

/**
 *  Generate an example in the usage message
 *
 * @param {string} text
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
const example = (text, description, color = DEFAULT_COLOR) => {
  text = text.replace('$0', path.basename(process.argv[1]))

  messages.examples.push({ text, description, color })

  return cli
}

/**
 * Ask a question to the user
 *
 * @param {Interface} interface
 * @param {string} message
 * @returns {Promise<string>}
 */
const askQuestion = (rlInterface, message) => {
  return new Promise(resolve => rlInterface.question(message, answer => resolve(answer)))
}

/**
 *
 * @param {string} text
 * @param {string} color
 * @returns {object}
 */
const epilog = (text, color = DEFAULT_COLOR) => {
  messages.epilog = { text, color }

  return cli
}

/**
 * Get the Boolean representation of the given value
 *
 * @param {*} value
 * @returns {Boolean}
 */
const getBoolean = (value) => {
  if (['true', 'yes', '1', true, 1].includes(value)) {
    return true
  } else if (['false', 'no', '0', false, 0].includes(value)) {
    return false
  }
}

/**
 * Parse the given params and return a object with a representation of the
 * params with the values.
 *
 * @param {Array<string>} params
 * @returns {object}
 */
const getParams = (params = process.argv.slice(2) || []) => {
  const options = {}

  // Is a better idea to declara the variable outside the loop
  let param
  while (params.length > 0) {
    param = params.shift()

    if (param.includes('=')) {
      const [name, value] = param.split('=')

      setOptionValue(options, name, getValue(value))
    } else {
      if (param.startsWith('-') || param.startsWith('--')) {
        setOptionValue(options, param, getValues(params))
      }
    }
  }

  return options
}

/**
 * Get the real value from the given param
 *
 * @param {*} value
 * @returns {*}
 */
const getValue = (value) => {
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
 * @param {Array<string>} params
 * @param {*} initial
 * @returns {array|*}
 */
const getValues = (params) => {
  const values = []

  // Is a better idea to declara the variable outside the loop
  let param
  while (params.length > 0) {
    param = params.shift()

    if (param.startsWith('-') || param.startsWith('--')) {
      params.unshift(param)

      break
    }

    values.push(getValue(param))
  }

  return values.length === 1 ? values[0] : values.length > 0 ? values : true
}

/**
 * Generate an option in the usage message
 *
 * @param {Array<string>} params
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
const option = (params, description, color = DEFAULT_COLOR) => {
  messages.options.push({ params, description, color })

  return cli
}

/**
 * Show a list of questions to the user and get the answers
 *
 * @param {Array<{type: string, name: string, message: string}>} questions
 * @returns {Array<string>}
 */
const prompt = async (questions) => {
  const answers = {}

  for (const question of questions) {
    const answer = await askQuestion(rlInterface, question.message)

    answers[question.name] = answer
  }

  rlInterface.close()

  return answers
}

const setOptionValue = (options, name, value) => {
  const isShourtcut = !name.startsWith('--')

  options[name.slice(isShourtcut ? 1 : 2)] = value

  return options
}

/**
 * Show the usage message to the console
 */
const show = () => {
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

  console.log(format[messages.epilog.color](`\n${messages.epilog.text}`))
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
    console.log(format[message.color](`  ${message.text}  ${message.description}`))
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
      console.log(format[message.color](`  ${message.params.join(', ')}  ${message.description}`))
    })
  }
}

/**
 * Show the usage message in the console
 *
 */
const showUsage = () => {
  console.log(format.white('\r') +
  format[messages.usage.color](`\r${messages.usage.text}`))
}

/**
 *
 * @param {string} text
 * @param {string} color
 */
const usage = (text = '', color = DEFAULT_COLOR) => {
  text = text.replace('$0', path.basename(process.argv[1]))

  messages.usage = { text, color }

  return cli
}

const cli = {
  epilog,
  example,
  getParams,
  option,
  prompt,
  show,
  usage
}

module.exports = cli
