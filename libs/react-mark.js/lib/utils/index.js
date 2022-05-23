"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToRegex = exports.mapExcludesToValue = exports.getValues = exports.filterOutFalsy = void 0;
const fp_1 = require("lodash/fp");
exports.filterOutFalsy = (0, fp_1.filter)((item) => Boolean(item));
const getValues = (values) => (0, fp_1.pipe)(exports.mapExcludesToValue, exports.filterOutFalsy)(values);
exports.getValues = getValues;
const mapExcludesToValue = (values) => (0, fp_1.map)(({ value }) => Boolean(value) && typeof value === 'string' ? String(value) : undefined)(values);
exports.mapExcludesToValue = mapExcludesToValue;
// https://stackoverflow.com/a/55258958/4742733
const stringToRegex = (str) => {
    const stringMatch = str.match(/\/(.+)\/.*/);
    // Main regex
    const main = stringMatch ? stringMatch[1] : '';
    const optionsMatch = str.match(/\/.+\/(.*)/);
    // Regex options
    const options = optionsMatch ? optionsMatch[1] : '';
    // Compiled regex
    return new RegExp(main, options);
};
exports.stringToRegex = stringToRegex;
//# sourceMappingURL=index.js.map