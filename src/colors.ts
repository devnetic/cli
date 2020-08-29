const reset: string = '\x1b[0m{REPLACE-CONTENT}\x1b[0m'
const bold: string = '\x1b[1m{REPLACE-CONTENT}\x1b[22m'
const dim: string = '\x1b[2m{REPLACE-CONTENT}\x1b[22m'
const italic: string = '\x1b[3m{REPLACE-CONTENT}\x1b[23m'
const underline: string = '\x1b[4m{REPLACE-CONTENT}\x1b[24m'
const blink: string = '\x1b[5m{REPLACE-CONTENT}\x1b[25m'
const inverse: string = '\x1b[7m{REPLACE-CONTENT}\x1b[27m'
const hidden: string = '\x1b[8m{REPLACE-CONTENT}\x1b[28m'
const strikeThrough: string = '\x1b[9m{REPLACE-CONTENT}\x1b[29m'

const black: string = '\x1b[30m{REPLACE-CONTENT}\x1b[39m'
const red: string = '\x1b[31m{REPLACE-CONTENT}\x1b[39m'
const green: string = '\x1b[32m{REPLACE-CONTENT}\x1b[39m'
const yellow: string = '\x1b[33m{REPLACE-CONTENT}\x1b[39m'
const blue: string = '\x1b[34m{REPLACE-CONTENT}\x1b[39m'
const magenta: string = '\x1b[35m{REPLACE-CONTENT}\x1b[39m'
const cyan: string = '\x1b[36m{REPLACE-CONTENT}\x1b[39m'
const white: string = '\x1b[37m{REPLACE-CONTENT}\x1b[39m'
const gray: string = '\x1b[90m{REPLACE-CONTENT}\x1b[39m'

const bgBlack: string = '\x1b[40m{REPLACE-CONTENT}\x1b[49m'
const bgRed: string = '\x1b[41m{REPLACE-CONTENT}\x1b[49m'
const bgGreen: string = '\x1b[42m{REPLACE-CONTENT}\x1b[49m'
const bgYellow: string = '\x1b[43m{REPLACE-CONTENT}\x1b[49m'
const bgBlue: string = '\x1b[44m{REPLACE-CONTENT}\x1b[49m'
const bgMagenta: string = '\x1b[45m{REPLACE-CONTENT}\x1b[49m'
const bgCyan: string = '\x1b[46m{REPLACE-CONTENT}\x1b[49m'
const bgWhite: string = '\x1b[47m{REPLACE-CONTENT}\x1b[49m'

const colors: Object = {
  reset,
  bold,
  dim,
  italic,
  underline,
  blink,
  inverse,
  hidden,
  strikeThrough,

  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,

  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite
}

const getColor = (name: string): string => {
  return Reflect.get(colors, name)
}

export {
  colors,
  getColor
}
