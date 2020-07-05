/**
 * Check if the given value is a Boolean
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isBoolean = (value: any): Boolean => {
  if (['true', 'false', '1', '0', 'yes', 'no', true, false, 1, 0].includes(value)) {
    return true
  }

  return false
}

export {
  isBoolean
}
