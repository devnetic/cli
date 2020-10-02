import { getColor } from './colors'

let styles: string = ''

interface Formatter {
  log: () => string
  reset: (text: string) => string
  bold: (text: string) => string
  dim: (text: string) => string
  italic: (text: string) => string
  underline: (text: string) => string
  blink: (text: string) => string
  inverse: (text: string) => string
  hidden: (text: string) => string
  strikeThrough: (text: string) => string
  black: (text: string) => string
  red: (text: string) => string
  green: (text: string) => string
  yellow: (text: string) => string
  blue: (text: string) => string
  magenta: (text: string) => string
  cyan: (text: string) => string
  white: (text: string) => string
  gray: (text: string) => string
  bgBlack: (text: string) => string
  bgRed: (text: string) => string
  bgGreen: (text: string) => string
  bgYellow: (text: string) => string
  bgBlue: (text: string) => string
  bgMagenta: (text: string) => string
  bgCyan: (text: string) => string
  bgWhite: (text: string) => string
}

const handler = {
  get: (target: Formatter, name: string): Function => {
    return (text: string = ''): Formatter | string => {
      if (styles === '') {
        styles = getColor(name)
      }

      if (text === '') {
        styles = styles.replace('{REPLACE-CONTENT}', getColor(name))
      } else {
        styles = styles.replace('{REPLACE-CONTENT}', getColor(name)
          .replace('{REPLACE-CONTENT}', text))

        return target.log()
      }

      return format
    }
  }
}

const target: Object = {
  log: (): string => {
    const formatted: string = styles.valueOf()

    styles = ''

    return formatted
  }
}

const format = new Proxy(target, handler) as Formatter

export {
  format
}
