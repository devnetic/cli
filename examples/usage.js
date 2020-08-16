const { cli } = require('./../lib')

cli.usage('Usage: $0 <command> [options]')
  .option(['-f', '--file'], 'Load a file', 'red')
  .option(['-h', '--help'], 'Show help', 'blue')
  .example('$0 -f foo.js', 'count the lines in the given file')
  .epilog('copyright 2019', 'green')
  .show()

cli.usage('Usage: $0 [options]')
  .option(['-p', '--port'], '\t\tPort to use [3000]')
  .option(['-H', '--host'], '\t\tAddress to use [0.0.0.0]')
  .option(['-s', '--silent'], '\tSuppress log messages from output')
  .option(['--cors[=headers]'], '\tEnable CORS via the "Access-Control-Allow-Origin" header.')
  .option([], '\t\t\tOptionally provide CORS headers list separated by commas.')
  .option(['-S', '--ssl'], '\t\tEnable https.')
  .option(['-C', ' --cert'], '\t\tPath to ssl cert file (default: cert.pem).')
  .option(['-K', '--key'], '\t\tPath to ssl key file (default: key.pem).')
  .option(['-h', '--help'], '\t\tPrint this list and exit.')
  .epilog(`Server package copyright ${new Date().getFullYear()}`)
  .show()