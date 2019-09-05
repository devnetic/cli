# @kiirus/cli
A tool for rapidly parse command line arguments or options.

## Usage
```javascript
const { getParams } = require('@kiirus/cli')

const params = getParams()

if (params.help || params.h) {
  console.log('Help option is used')
}
```
