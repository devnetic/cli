"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const utils_1 = require("@devnetic/utils");
const format_1 = require("./format");
const utils_2 = require("./utils");
const rlInterface = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const DEFAULT_COLOR = 'white';
const messages = {
    epilog: { color: '', text: '' },
    examples: [],
    options: [],
    usage: { color: '', text: '' }
};
// const PARAM_REGEX = /-{1,2}([a-z]+)[=|\s]*([a-z0-9\s"'/.]*)/
/**
 * Ask a question to the user
 *
 * @param {Interface} interface
 * @param {string} message
 * @returns {Promise<string>}
 */
const askQuestion = (rlInterface, message) => {
    return new Promise(resolve => rlInterface.question(message, answer => resolve(answer)));
};
/**
 *
 * @param {string} text
 * @param {string} color
 * @returns {object}
 */
const epilog = (text, color = DEFAULT_COLOR) => {
    messages.epilog = { text, color };
    return exports.cli;
};
/**
 *  Generate an example in the usage message
 *
 * @param {string} text
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
const example = (text, description, color = DEFAULT_COLOR) => {
    text = text.replace('$0', path_1.default.basename(process.argv[1]));
    messages.examples.push({ text, description, color });
    return exports.cli;
};
/**
 * Get the Boolean representation of the given value
 *
 * @param {*} value
 * @returns {Boolean}
 */
const getBoolean = (value) => {
    if (['true', 'yes', '1', true, 1].includes(value)) {
        return true;
    }
    else if (['false', 'no', '0', false, 0].includes(value)) {
        return false;
    }
    return false;
};
/**
 * Parse the given params and return a object with a representation of the
 * params with the values.
 *
 * @param {string[]} options
 * @returns {object}
 */
const getParams = (options = process.argv.slice(2) || []) => {
    const params = {};
    // Is a better idea to declara the variable outside the loop
    let param;
    while (options.length > 0) {
        param = options.shift();
        if (param.includes('=')) {
            const [name, value] = param.split('=');
            setParamValue(params, name, getValue(value));
        }
        else {
            if (param.startsWith('-') || param.startsWith('--')) {
                setParamValue(params, param, getValues(options));
            }
        }
    }
    return params;
    // return options.reduce((params: Params, option, index: number) => {
    //   if (option.includes('=')) {
    //     const [name, value] = option.split('=')
    //     setParamValue(params, name, getValue(value))
    //   } else {
    //     if (option.startsWith('-') || option.startsWith('--')) {
    //       setParamValue(params, option, getValues(options.slice(index + 1)))
    //     }
    //   }
    //   return params
    // }, {})
    // const params: Params = {}
    // for (const option of options) {
    //   if (option.includes('=')) {
    //     const [name, value] = option.split('=')
    //     setParamValue(params, name, getValue(value))
    //   } else {
    //     if (option.startsWith('-') || option.startsWith('--')) {
    //       setParamValue(params, option, getValues(options))
    //     }
    //   }
    // }
    // return params
};
/**
 * Get the real value from the given param
 *
 * @param {*} value
 * @returns {*}
 */
const getValue = (value) => {
    if (utils_1.isInteger(value)) {
        return parseInt(value, 10);
    }
    else if (utils_1.isFloat(value)) {
        return parseFloat(value);
    }
    else if (utils_2.isBoolean(value)) {
        return getBoolean(value);
    }
    return value;
};
/**
 * Get the params values.  If the param have a list of values the function
 * return and array with all the values, otherwise return a single value.
 *
 * @param {string[]} params
 * @param {*} initial
 * @returns {array|*}
 */
const getValues = (params) => {
    const values = [];
    // Is a better idea to declara the variable outside the loop
    let param;
    while (params.length > 0) {
        param = params.shift();
        if (param.startsWith('-') || param.startsWith('--')) {
            params.unshift(param);
            break;
        }
        values.push(getValue(param));
    }
    // for (const param of params) {
    //   if (param.startsWith('-') || param.startsWith('--')) {
    //     params.unshift(param)
    //     break
    //   }
    //   values.push(getValue(param))
    // }
    return values.length === 1 ? values[0] : values.length > 0 ? values : true;
};
/**
 * Generate an option in the usage message
 *
 * @param {string[]} params
 * @param {string} description
 * @param {string} color
 * @returns {object}
 */
const option = (params, description, color = DEFAULT_COLOR) => {
    messages.options.push({ params, description, color });
    return exports.cli;
};
/**
 * Show a list of questions to the user and get the answers
 *
 * @param {Question[]} questions
 * @returns {string[]}
 */
const prompt = (questions) => __awaiter(void 0, void 0, void 0, function* () {
    const answers = {};
    for (const question of questions) {
        const answer = yield askQuestion(rlInterface, question.message);
        answers[question.name] = answer;
    }
    rlInterface.close();
    return answers;
});
const setParamValue = (params, name, value) => {
    const isShortcut = !name.startsWith('--');
    params[name.slice(isShortcut ? 1 : 2)] = value;
    return params;
};
/**
 * Show the usage message to the console
 */
const show = () => {
    showUsage();
    showOptions();
    showExample();
    showEpilog();
};
/**
 * Show the epilog message in the console
 *
 */
const showEpilog = () => {
    if (!messages.epilog) {
        return;
    }
    // console.log(format[messages.epilog.color](`\n${messages.epilog.text}`))
    console.log(Reflect.get(format_1.format, messages.epilog.color)(`\n${messages.epilog.text}`));
};
/**
 * Show the example messages in the console
 *
 */
const showExample = () => {
    if (messages.examples.length > 0) {
        console.log(format_1.format.white('\nExamples:\r'));
    }
    messages.examples.forEach((message) => {
        // console.log(format[message.color](`  ${message.text}  ${message.description}`))
        console.log(Reflect.get(format_1.format, message.color)(`  ${message.text}  ${message.description}`));
    });
};
/**
 * Show the option messages in the console
 *
 */
const showOptions = () => {
    if (messages.options.length > 0) {
        console.log(format_1.format.white('\nOptions:\r'));
        messages.options.forEach((message) => {
            // console.log(format[message.color](`  ${message.params.join(', ')}  ${message.description}`))
            console.log(Reflect.get(format_1.format, message.color)(`  ${message.params.join(', ')}  ${message.description}`));
        });
    }
};
/**
 * Show the usage message in the console
 *
 */
const showUsage = () => {
    const usage = format_1.format.white('\r')
        + Reflect.get(format_1.format, messages.usage.color)(`\r${messages.usage.text}`);
    // getColor(messages.usage.color)
    console.log(usage);
};
/**
 *
 * @param {string} text
 * @param {string} color
 */
const usage = (text = '', color = DEFAULT_COLOR) => {
    text = text.replace('$0', path_1.default.basename(process.argv[1]));
    messages.usage = { text, color };
    return exports.cli;
};
exports.cli = {
    epilog,
    example,
    getParams,
    option,
    prompt,
    show,
    usage
};
//# sourceMappingURL=cli.js.map