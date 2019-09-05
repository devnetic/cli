const colors = require('./colors')

let styles = ''

const handler = {
  get: (target, name) => {
    return (text = '') => {
      if (styles === '') {
        styles = colors[name]
      }

      if (!text) {
        styles = styles.replace('{REPLACE-CONTENT}', colors[name])
      } else {
        styles = styles.replace('{REPLACE-CONTENT}', colors[name].replace('{REPLACE-CONTENT}', text))

        return target.log()
      }

      return format
    }
  }
}

// const print = new Proxy({
//   log: () => {
//     console.log(styles)

//     styles = ''
//   }
// }, handler)

const format = new Proxy({
  log: () => {
    const formated = styles.valueOf()

    styles = ''

    return formated
  }
}, handler)

module.exports = {
  format
  // print
}
