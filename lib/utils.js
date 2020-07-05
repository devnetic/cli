"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBoolean = void 0;
/**
 * Check if the given value is a Boolean
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isBoolean = (value) => {
    if (['true', 'false', '1', '0', 'yes', 'no', true, false, 1, 0].includes(value)) {
        return true;
    }
    return false;
};
exports.isBoolean = isBoolean;
//# sourceMappingURL=utils.js.map