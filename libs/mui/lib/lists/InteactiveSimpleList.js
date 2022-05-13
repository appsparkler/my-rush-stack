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
exports.InteactiveSimpleList = void 0;
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const common_utils_1 = require("common-utils");
const fp_1 = require("lodash/fp");
const layouts_1 = require("../layouts");
const react_1 = __importStar(require("react"));
// utils
const getDefaultExcludeItem = () => {
    return { id: (0, fp_1.uniqueId)('exclude'), value: '' };
};
const InteactiveSimpleList = ({ title = '', label = '', ariaLabelAdd = '', ariaLabelDelete = '', name = '', onChange = fp_1.noop, }) => {
    const [value, setValue] = (0, react_1.useState)([getDefaultExcludeItem()]);
    const handleChangeItem = (0, react_1.useCallback)((id) => ({ target: { value: $value } }) => {
        const ctxItem = (0, common_utils_1.findById)(id)(value);
        if (ctxItem) {
            const updatedItems = (0, common_utils_1.updateItemWithMatchingId)(Object.assign(Object.assign({}, ctxItem), { value: $value }))(value);
            setValue(updatedItems);
        }
    }, [value]);
    const handleClickAdd = (0, react_1.useCallback)(() => {
        setValue((prevValue) => [...prevValue, getDefaultExcludeItem()]);
    }, []);
    const handleClickDelete = (0, react_1.useCallback)((id) => () => {
        setValue((prevValue) => (0, common_utils_1.filterOutWithId)(id)(prevValue));
    }, []);
    (0, react_1.useEffect)(() => {
        onChange(name, value);
    }, [name, onChange, value]);
    return (react_1.default.createElement(layouts_1.Vertical, { gap: 1 },
        react_1.default.createElement(material_1.Typography, { variant: "h6" }, title),
        react_1.default.createElement(layouts_1.Vertical, { gap: 2 }, value.map((item, index) => (react_1.default.createElement(layouts_1.Horizontal, { key: item.id },
            react_1.default.createElement(material_1.TextField, { label: label, size: "small", fullWidth: true, type: "text", key: item.id, value: item.value, onChange: handleChangeItem(item.id) }),
            react_1.default.createElement(material_1.Box, null, index === 0 ? (react_1.default.createElement(material_1.IconButton, { "aria-label": ariaLabelAdd, color: "primary", size: "small", onClick: handleClickAdd },
                react_1.default.createElement(icons_material_1.Add, null))) : (react_1.default.createElement(material_1.IconButton, { "aria-label": ariaLabelDelete, color: "warning", size: "small", onClick: handleClickDelete(item.id), disabled: index === 0 },
                react_1.default.createElement(icons_material_1.Delete, null))))))))));
};
exports.InteactiveSimpleList = InteactiveSimpleList;
//# sourceMappingURL=InteactiveSimpleList.js.map