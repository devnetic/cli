// const { cli: { getParams, format, usage } } = require('./../lib/')
const { cli, format } = require('./../lib')

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
  'ho',
  '-H',
  '127.0.0.1'
]

// const fixed = cli.getParams(argv)
// const params = cli.getParams()

// console.log(format.white(JSON.stringify(fixed, null, '  ')))
// console.log(format.bold().italic().red(JSON.stringify(fixed, null, '  ')))

// usage('Usage: $0 <command> [options]')
//   .option(['-f', '--file'], 'Load a file', 'red')
//   .option(['-h', '--help'], 'Show help', 'blue')
//   .example('$0 -f foo.js', 'count the lines in the given file')
//   .epilog('copyright 2019', 'green')
//   .show()

// cli.usage('Usage: $0 [options]')
//   .option(['-p', '--port'], '\t\tPort to use [3000]')
//   .option(['-H', '--host'], '\t\tAddress to use [0.0.0.0]')
//   .option(['-s', '--silent'], '\tSuppress log messages from output')
//   .option(['--cors[=headers]'], '\tEnable CORS via the "Access-Control-Allow-Origin" header.')
//   .option([], '\t\t\tOptionally provide CORS headers list separated by commas.')
//   .option(['-S', '--ssl'], '\t\tEnable https.')
//   .option(['-C', ' --cert'], '\t\tPath to ssl cert file (default: cert.pem).')
//   .option(['-K', '--key'], '\t\tPath to ssl key file (default: key.pem).')
//   .option(['-h', '--help'], '\t\tPrint this list and exit.')
//   .epilog(`Server package copyright ${new Date().getFullYear()}`)
//   .show()

// const error = format.bold().red

// console.log(error('Unexpeted Error!'))
// console.log(format.bold().yellow('This is a Warning!'))
