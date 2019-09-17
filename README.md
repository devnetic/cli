# @devnetic/cli

![npm (scoped)](https://img.shields.io/npm/v/@devnetic/cli)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@devnetic/cli?color=red)
![npm](https://img.shields.io/npm/dt/@devnetic/cli)
![GitHub issues](https://img.shields.io/github/issues-raw/devnetic/cli)
![GitHub](https://img.shields.io/github/license/devnetic/cli)

A tool for rapidly parse command line arguments or options.

## Usage

Parse cli arguments:

```javascript
const { getParams } = require('@devnetic/cli')

const params = getParams()

if (params.help || params.h) {
  console.log('Help option is used')
}

// execute with node index.js --help or node index.js -h
```

Using the `usage` function to create a help for our command line tools:

```javascript
const { usage } = require('@devnetic/cli')

usage('Usage: $0 <command> [options]')
  .option(['-f', '--file'], 'Load a file', 'red')
  .option(['-h', '--help'], 'Show help', 'blue')
  .example('$0 -f foo.js', 'count the lines in the given file')
  .epilog('copyright 2019', 'green')
  .show()
```

Using the `format` function to custom messages for our command lines tools:

```javascript
const { format } = require('@devnetic/cli')

const error = format.bold().red

console.log(format.white(JSON.stringify(fixed, null, '  ')))
console.log(format.bold().italic().red(JSON.stringify(params, null, '  ')))

console.log(error('Unexpeted Error!'))
console.log(format.bold().yellow('This is a Warning!'))
```
