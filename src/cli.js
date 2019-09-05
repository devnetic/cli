const path = require('path')

const { format } = require('./format')

const DEFAULT_COLOR = 'white'
const messages = {}
// const PARAM_REGEX = /-{1,2}([a-z]+)[=|\s]*([a-z0-9\s"'/.]*)/

/**
 *
 * @param {string} text
 * @param {string} color
 * @returns {object}
 */
const epilog = (text, color = DEFAULT_COLOR) => {
  messages['epilog'] = { text, color }

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
const getParams = (params = process.argv || {}) => {
  const options = {}
  let param

  params = params.slice(2)
  while (params.length > 0) {
    let item = params.shift()
    let value

    if (item.includes('=')) {
      [item, value] = item.split('=')
      params.unshift(value)
    }

    if (item.startsWith('-') || item.startsWith('--')) {
      const isShourtcut = !item.startsWith('--')

      param = item.slice(isShourtcut ? 1 : 2)
      options[param] = true
    } else {
      options[param] = getValues(params, getValue(item))
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
const getValues = (params, initial) => {
  const values = [initial]

  while (params.length > 0) {
    const item = params.shift()

    if (item.startsWith('-') || item.startsWith('--')) {
      params.unshift(item)

      break
    }

    values.push(item)
  }

  return values.length === 1 ? values[0] : values
}

/**
 * Check if the given value is a Boolean
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isBoolean = (value) => {
  if (['true', 'yes', '1', 'false', 'no', '0', true, false, 1, 0].includes(value)) {
    return true
  }

  return false
}

/**
 * Chek if the given value is a float
 * @param {*} value
 * @returns {boolean}
 */
const isFloat = (value) => {
  return /[-|+]?\d+\.\d+/.test(value)
}

/**
 * Chek if the given value is an integer
 *
 * @param {*} value
 * @returns {boolean}
 */
const isInteger = (value) => {
  return /^\d+$/.test(value)
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
  if (!Array.isArray(messages['option'])) {
    messages['option'] = []
  }

  messages['option'].push({ params, description, color })

  return cli
}

/**
 *  Generate an exmple in the usage message
 *
 * @param {string} text
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
const example = (text, description, color = DEFAULT_COLOR) => {
  text = text.replace('$0', path.basename(process.argv[1]))

  if (!Array.isArray(messages['example'])) {
    messages['example'] = []
  }

  messages['example'].push({ text, description, color })

  return cli
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
  console.log(format[messages['epilog'].color](`\n${messages['epilog'].text}`))
}

/**
 * Show the example messages in the console
 *
 */
const showExample = () => {
  if (messages['example'].length > 0) {
    console.log(format.white('\nExamples:\r'))
  }

  messages['example'].forEach((message) => {
    console.log(format[message.color](`  ${message.text}  ${message.description}`))
  })
}

/**
 * Show the option messages in the console
 *
 */
const showOptions = () => {
  if (messages['option'].length > 0) {
    console.log(format.white('\nOptions:\r'))
  }

  messages['option'].forEach((message) => {
    console.log(format[message.color](`  ${message.params.join(', ')}  ${message.description}`))
  })
}

/**
 * Show the usage message in the console
 *
 */
const showUsage = () => {
  return format.white('\r') +
  format[messages['usage'].color](`\r${messages['usage'].text}`)
}

/**
 *
 * @param {string} text
 * @param {string} color
 */
const usage = (text, color = DEFAULT_COLOR) => {
  text = text.replace('$0', path.basename(process.argv[1]))

  messages['usage'] = { text, color }

  return cli
}

const cli = {
  epilog,
  example,
  getParams,
  option,
  show,
  usage
}

module.exports = cli
