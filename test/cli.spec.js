const test = require('ava')

const cli = require('../lib')

test('should returns the correct params', t => {
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

  const expected = {
    ships: 12,
    z: ['one', 'two', 'three'],
    distance: 98.7,
    u: true,
    v: ['me hearties', 'yo', 'ho'],
    H: '127.0.0.1'
  }

  t.deepEqual(cli.getParams(argv), expected)
})

test('should generate the correct usage', t => {
  cli.usage('Usage: $0 <command> [options]')

  t.is(cli.messages.usage.text, 'Usage: subprocess.js <command> [options]')
  t.is(cli.messages.usage.color, 'white')
})

test('should generate the correct option', t => {
  const expected = [{
    color: 'red',
    description: 'Load a file',
    params: ['-f', '--file']
  }, {
    color: 'blue',
    description: 'Show help',
    params: ['-h', '--help']
  }]

  cli.option(['-f', '--file'], 'Load a file', 'red')
    .option(['-h', '--help'], 'Show help', 'blue')

  t.deepEqual(cli.messages.options, expected)
})

test('should generate the example option', t => {
  const expected = [{
    color: 'white',
    description: 'count the lines in the given file',
    text: 'subprocess.js -f foo.js'
  }]

  cli.example('$0 -f foo.js', 'count the lines in the given file')

  t.deepEqual(cli.messages.examples, expected)
})

test('should generate the epilog option', t => {
  const expected = {
    color: 'green',
    text: 'copyright 2019'
  }

  cli.epilog('copyright 2019', 'green')
    .show()

  t.deepEqual(cli.messages.epilog, expected)
})

test('should generate empty epilog option', t => {
  const expected = {
    color: 'white',
    text: undefined
  }

  cli.epilog()
    .show()

  t.deepEqual(cli.messages.epilog, expected)
})

test('should returns the correct input', async t => {
  const questions = [{
    type: 'input',
    name: 'firstName',
    message: 'What\'s your first name? '
  }, {
    type: 'input',
    name: 'lastName',
    message: 'What\'s your last name? '
  }, {
    type: 'input',
    name: 'phoneNumber',
    message: 'What\'s your phone number? '
  }]

  const expected = { firstName: 'John', lastName: 'Doe', phoneNumber: '234567890' }

  setTimeout(() => {
    process.stdin.emit('data', 'John')
    process.stdin.emit('data', '\r')
  }, 100)

  setTimeout(() => {
    process.stdin.emit('data', 'Doe')
    process.stdin.emit('data', '\r')
  }, 200)

  setTimeout(() => {
    process.stdin.emit('data', '234567890')
    process.stdin.emit('data', '\r')
  }, 300)

  const answers = await cli.prompt(questions)

  console.log('answers: %o', answers)

  t.deepEqual(answers, expected)
})
