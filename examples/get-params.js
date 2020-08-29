const cli = require('./../lib')

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

const fixed = cli.getParams(argv)
const params = cli.getParams()

console.log('fixed: %o', fixed)
console.log('params: %o', params)
