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
exports.DynamicKeyValueList = exports.uniqueIdKeyValueItem = void 0;
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const common_utils_1 = require("common-utils");
const lodash_1 = require("lodash");
const fp_1 = require("lodash/fp");
const mui_1 = require("mui");
const react_1 = __importStar(require("react"));
// Utils
const uniqueIdKeyValueItem = () => (0, fp_1.uniqueId)('synonym-item');
exports.uniqueIdKeyValueItem = uniqueIdKeyValueItem;
// JSX
const DynamicKeyValueList = ({ name = '', title = '', onChange = lodash_1.noop, value = [], }) => {
    const handleClickAdd = (0, react_1.useCallback)(() => {
        onChange(name, [
            ...value,
            {
                field1: Object.assign(Object.assign({}, value[0].field1), { value: '' }),
                field2: Object.assign(Object.assign({}, value[0].field2), { value: '' }),
                id: (0, exports.uniqueIdKeyValueItem)(),
            },
        ]);
    }, [name, onChange, value]);
    const handleClickDelete = (0, react_1.useCallback)((id) => () => {
        onChange(name, (0, common_utils_1.filterOutWithId)(id)(value));
    }, [name, onChange, value]);
    const handleChangeInput = (0, react_1.useCallback)((id) => ({ target: { value: $value, name: $name } }) => {
        const itemToUpdate = (0, common_utils_1.findById)(id)(value);
        if (itemToUpdate) {
            const updatedItems = (0, common_utils_1.updateItemWithMatchingId)(Object.assign(Object.assign({}, itemToUpdate), { [$name]: Object.assign(Object.assign({}, itemToUpdate[$name]), { value: $value }) }))(value);
            onChange(name, updatedItems);
        }
    }, [name, onChange, value]);
    return (react_1.default.createElement(material_1.Box, { display: "flex", gap: 1, flexDirection: "column" },
        react_1.default.createElement(material_1.Typography, { variant: "h6" }, title),
        react_1.default.createElement(material_1.Box, { display: "flex", gap: 2, flexDirection: "column" }, value.map((item, index) => (react_1.default.createElement(mui_1.Horizontal, { gap: 2, alignItems: "center", key: item.id },
            react_1.default.createElement(material_1.TextField, Object.assign({ fullWidth: true, name: "field1", onChange: handleChangeInput(item.id) }, item.field1)),
            react_1.default.createElement(material_1.TextField, Object.assign({ fullWidth: true, onChange: handleChangeInput(item.id), name: "field2" }, item.field2)),
            index === 0 ? (react_1.default.createElement(material_1.Box, null,
                react_1.default.createElement(material_1.IconButton, { "aria-label": "add synonym", color: "primary", size: "small", onClick: handleClickAdd },
                    react_1.default.createElement(icons_material_1.Add, null)))) : (react_1.default.createElement(material_1.Box, null,
                react_1.default.createElement(material_1.IconButton, { "aria-label": "delete synonym", color: "warning", size: "small", onClick: handleClickDelete(item.id) },
                    react_1.default.createElement(icons_material_1.Delete, null))))))))));
};
exports.DynamicKeyValueList = DynamicKeyValueList;
//# sourceMappingURL=DynamicKeyValueList.js.map