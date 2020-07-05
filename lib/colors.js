"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColor = exports.colors = void 0;
const reset = '\x1b[0m{REPLACE-CONTENT}\x1b[0m';
const bold = '\x1b[1m{REPLACE-CONTENT}\x1b[22m';
const dim = '\x1b[2m{REPLACE-CONTENT}\x1b[22m';
const italic = '\x1b[3m{REPLACE-CONTENT}\x1b[23m';
const underline = '\x1b[4m{REPLACE-CONTENT}\x1b[24m';
const blink = '\x1b[5m{REPLACE-CONTENT}\x1b[25m';
const inverse = '\x1b[7m{REPLACE-CONTENT}\x1b[27m';
const hidden = '\x1b[8m{REPLACE-CONTENT}\x1b[28m';
const strikeThrough = '\x1b[9m{REPLACE-CONTENT}\x1b[29m';
const black = '\x1b[30m{REPLACE-CONTENT}\x1b[39m';
const red = '\x1b[31m{REPLACE-CONTENT}\x1b[39m';
const green = '\x1b[32m{REPLACE-CONTENT}\x1b[39m';
const yellow = '\x1b[33m{REPLACE-CONTENT}\x1b[39m';
const blue = '\x1b[34m{REPLACE-CONTENT}\x1b[39m';
const magenta = '\x1b[35m{REPLACE-CONTENT}\x1b[39m';
const cyan = '\x1b[36m{REPLACE-CONTENT}\x1b[39m';
const white = '\x1b[37m{REPLACE-CONTENT}\x1b[39m';
const gray = '\x1b[90m{REPLACE-CONTENT}\x1b[39m';
const bgBlack = '\x1b[40m{REPLACE-CONTENT}\x1b[49m';
const bgRed = '\x1b[41m{REPLACE-CONTENT}\x1b[49m';
const bgGreen = '\x1b[42m{REPLACE-CONTENT}\x1b[49m';
const bgYellow = '\x1b[43m{REPLACE-CONTENT}\x1b[49m';
const bgBlue = '\x1b[44m{REPLACE-CONTENT}\x1b[49m';
const bgMagenta = '\x1b[45m{REPLACE-CONTENT}\x1b[49m';
const bgCyan = '\x1b[46m{REPLACE-CONTENT}\x1b[49m';
const bgWhite = '\x1b[47m{REPLACE-CONTENT}\x1b[49m';
const colors = {
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
};
exports.colors = colors;
const getColor = (name) => {
    return Reflect.get(colors, name);
};
exports.getColor = getColor;
//# sourceMappingURL=colors.js.map