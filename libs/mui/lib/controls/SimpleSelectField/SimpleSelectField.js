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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSelect = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const fp_1 = require("lodash/fp");
const SimpleSelect = ({ name = '', label = '', value = '', menuItems = [], onChange = fp_1.noop, }) => {
    const handleChange = (0, react_1.useCallback)(() => ({ target: { value } }) => {
        onChange(name, value);
    }, [name, onChange]);
    return (react_1.default.createElement(material_1.FormControl, { fullWidth: true },
        react_1.default.createElement(material_1.InputLabel, null, label),
        react_1.default.createElement(material_1.Select, { onChange: handleChange(), value: value, label: label, size: 'small' }, menuItems.map(({ name, value, id }) => (react_1.default.createElement(material_1.MenuItem, { selected: true, key: id, value: value }, name))))));
};
exports.SimpleSelect = SimpleSelect;
//# sourceMappingURL=SimpleSelectField.js.map