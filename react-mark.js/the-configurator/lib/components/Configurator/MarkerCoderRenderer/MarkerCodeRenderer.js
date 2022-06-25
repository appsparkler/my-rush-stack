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
exports.MarkerCodeRenderer = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const Prism = __importStar(require("prismjs"));
require("prismjs/components/prism-jsx.js");
require("prismjs/themes/prism-tomorrow.css");
const fp_1 = require("lodash/fp");
const MarkerCodeRenderer = ({ mark = '', markerType = 'Marker', isRangesMarker = false, options = {}, ranges = [], wrapperProps = {}, onChange = fp_1.noop, isMarkArray = false, }) => {
    const codeRef = (0, react_1.useRef)(null);
    const optionsString = (0, react_1.useMemo)(() => {
        return JSON.stringify(options, null, 4).replace('}', `  }`);
    }, [options]);
    const markRenderer = (0, react_1.useMemo)(() => {
        if (isRangesMarker) {
            const SPACES_2 = `  `;
            const rangesJSON = JSON.stringify(ranges, null, 4).replace(']', `${SPACES_2}]`);
            return `mark={${rangesJSON}}`;
        }
        if (isMarkArray) {
            return `mark={${mark}}`;
        }
        return `mark="${mark}"`;
    }, [isMarkArray, isRangesMarker, mark, ranges]);
    const optionsRender = (0, react_1.useMemo)(() => {
        const showOptions = (0, fp_1.keys)(options).length > 0 ? true : false;
        if (showOptions) {
            return `
  options={${optionsString}}
/>`;
        }
        return `
/>`;
    }, [options, optionsString]);
    const code = (0, react_1.useMemo)(() => `<${markerType}
  ${markRenderer}${optionsRender}`, [markRenderer, markerType, optionsRender]);
    (0, react_1.useEffect)(() => {
        onChange(code);
        const highlightedCode = Prism.highlight(code, Prism.languages.jsx, 'jsx');
        codeRef.current.innerHTML = highlightedCode;
    }, [code, mark, onChange, options]);
    return (react_1.default.createElement(material_1.Box, Object.assign({}, wrapperProps, { sx: { pre: { borderRadius: 4 } } }),
        react_1.default.createElement("pre", { className: "language-jsx" },
            react_1.default.createElement("code", { className: "language-jsx", ref: codeRef }))));
};
exports.MarkerCodeRenderer = MarkerCodeRenderer;
//# sourceMappingURL=MarkerCodeRenderer.js.map