const test = require('ava')

const cli = require('../lib')

test('should parse the correct params', t => {
  const argv = [
    '/home/aagamezl/.nvm/versions/node/v8.9.0/bin/node',
    '/home/aagamezl/workspace/personal/git-repos/kiirus/cli/test.js',
    '--ships=12',
    '--load=true',
    '--delete=false',
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

  const expected = {
    ships: 12,
    load: true,
    delete: false,
    z: ['one', 'two', 'three'],
    distance: 98.7,
    u: true,
    v: ['me hearties', 'yo', 'ho'],
    H: '127.0.0.1'
  }

  t.deepEqual(cli.getParams(argv), expected)
})
