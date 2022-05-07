"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Horizontal = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const Horizontal = (props) => {
    return react_1.default.createElement(material_1.Box, Object.assign({ display: "flex", flexDirection: 'row' }, props));
};
exports.Horizontal = Horizontal;
//# sourceMappingURL=Horizontal.js.map