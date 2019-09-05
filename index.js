const cli = require('./src/cli')
const format = require('./src/format')

module.exports = {
  ...cli,
  ...format
}
