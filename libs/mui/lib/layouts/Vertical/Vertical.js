"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertical = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const Vertical = (props) => {
    return react_1.default.createElement(material_1.Box, Object.assign({ display: "flex", flexDirection: 'column' }, props));
};
exports.Vertical = Vertical;
//# sourceMappingURL=Vertical.js.map