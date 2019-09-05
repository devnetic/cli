const { getParams, format, usage } = require('./../index')

// fixed params
const argv = [
  '/home/aagamezl/.nvm/versions/node/v8.9.0/bin/node',
  '/home/aagamezl/workspace/personal/git-repos/kiirus/cli/test.js',
  '--ships=12',
  '-z',
  'one',
  'two',
  'three',
  '--distance',
  '98.7',
  '-u',
  '-v',
  'me hearties',
  'yo',
  'ho'
]

const fixed = getParams(argv)
const params = getParams()

console.log(format.white(JSON.stringify(fixed, null, '  ')))
console.log(format.bold().italic().red(JSON.stringify(params, null, '  ')))

usage('Usage: $0 <command> [options]')
  .option(['-f', '--file'], 'Load a file', 'red')
  .option(['-h', '--help'], 'Show help', 'blue')
  .example('$0 -f foo.js', 'count the lines in the given file')
  .epilog('copyright 2019', 'green')
  .show()

const error = format.bold().red

console.log(error('Unexpeted Error!'))
console.log(format.bold().yellow('This is a Warning!'))
