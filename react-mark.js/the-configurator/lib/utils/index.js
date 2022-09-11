"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToRegex = exports.mapExcludesToValue = exports.getValues = exports.filterOutFalsy = void 0;
const fp_1 = require("lodash/fp");
__exportStar(require("./array-utils"), exports);
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
    try {
        const re = new RegExp(main, options);
        return re;
    }
    catch (error) {
        return new RegExp('');
    }
};
exports.stringToRegex = stringToRegex;
//# sourceMappingURL=index.js.map