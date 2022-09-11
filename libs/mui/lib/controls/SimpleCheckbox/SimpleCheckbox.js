"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCheckbox = void 0;
const material_1 = require("@mui/material");
const fp_1 = require("lodash/fp");
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
//
const SimpleCheckbox = (_a) => {
    var { checked, name = '', label = '', onChange = fp_1.noop } = _a, restProps = __rest(_a, ["checked", "name", "label", "onChange"]);
    const handleChange = (0, react_2.useCallback)(({ target: { checked, name } }) => {
        onChange(name, checked);
    }, [onChange]);
    return (react_1.default.createElement(material_1.FormControlLabel, Object.assign({ name: name, control: react_1.default.createElement(material_1.Checkbox, { checked: checked, onChange: handleChange }), label: label }, restProps)));
};
exports.SimpleCheckbox = SimpleCheckbox;
//# sourceMappingURL=SimpleCheckbox.js.map