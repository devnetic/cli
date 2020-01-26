/**
 * Check if the given value is a Boolean
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isBoolean = (value) => {
  if (['true', 'false', '1', '0', 'yes', 'no', true, false, 1, 0].includes(value)) {
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
  const parsed = parseFloat(value)

  if (Number.isNaN(parsed)) {
    return false
  }

  return parsed.toString().length === value.length
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

module.exports = {
  isBoolean,
  isFloat,
  isInteger
}
