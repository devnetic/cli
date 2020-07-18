const { format } = require('./../lib')

const fixed = {
  ships: 12,
  z: ['one', 'two', 'three'],
  distance: 98.7,
  u: true,
  v: ['me hearties', 'yo', 'ho'],
  H: '127.0.0.1'
}

console.log(format.white(JSON.stringify(fixed, null, '  ')))
console.log(format.bold().italic().red(JSON.stringify(fixed, null, '  ')))

const error = format.bold().red

console.log(error('Unexpeted Error!'))
console.log(format.bold().yellow('This is a Warning!'))
