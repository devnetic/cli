"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const colors_1 = require("./colors");
let styles = '';
const handler = {
    get: (target, name) => {
        return (text = '') => {
            if (styles === '') {
                styles = colors_1.getColor(name);
            }
            if (!text) {
                styles = styles.replace('{REPLACE-CONTENT}', colors_1.getColor(name));
            }
            else {
                styles = styles.replace('{REPLACE-CONTENT}', colors_1.getColor(name)
                    .replace('{REPLACE-CONTENT}', text));
                return target.log();
            }
            return format;
        };
    }
};
const target = {
    log: () => {
        const formatted = styles.valueOf();
        styles = '';
        return formatted;
    }
};
const format = new Proxy(target, handler);
exports.format = format;
//# sourceMappingURL=format.js.map