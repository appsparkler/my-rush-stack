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
exports.MarkerCodeRendererWithCopy = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const MarkerCodeRenderer_1 = require("../MarkerCoderRenderer/MarkerCodeRenderer");
const icons_material_1 = require("@mui/icons-material");
const MarkerCodeRendererWithCopy = ({ mark, options, }) => {
    const textareaRef = (0, react_1.useRef)(null);
    const [openSnackbar, setOpenSnackbar] = (0, react_1.useState)(false);
    const [textToCopy, setTextToCopy] = (0, react_1.useState)('');
    const handleClickCopy = (0, react_1.useCallback)(() => {
        var _a;
        (_a = textareaRef.current) === null || _a === void 0 ? void 0 : _a.select();
        document.execCommand('copy');
        setOpenSnackbar(true);
    }, []);
    const handleChange = (0, react_1.useCallback)((textToCopy) => {
        setTextToCopy(textToCopy);
    }, []);
    const handleClose = (0, react_1.useCallback)(() => {
        setOpenSnackbar(false);
    }, []);
    return (react_1.default.createElement(material_1.Box, { position: "relative" },
        react_1.default.createElement(MarkerCodeRenderer_1.MarkerCodeRenderer, { mark: mark, options: options, onChange: handleChange }),
        react_1.default.createElement(material_1.Box, { position: "absolute", top: 1, right: 1 },
            react_1.default.createElement(material_1.IconButton, { "aria-label": "copy", color: "primary", onClick: handleClickCopy },
                react_1.default.createElement(icons_material_1.ContentCopy, null))),
        react_1.default.createElement(material_1.Snackbar, { open: openSnackbar, autoHideDuration: 1000, onClose: handleClose, anchorOrigin: { vertical: 'top', horizontal: 'center' } },
            react_1.default.createElement(material_1.Alert, { onClose: handleClose, severity: "success", variant: "filled", sx: { width: '100%' } }, "copied!")),
        react_1.default.createElement(material_1.Box, { position: "absolute", left: 10000 },
            react_1.default.createElement("textarea", { ref: textareaRef, value: textToCopy }, textToCopy))));
};
exports.MarkerCodeRendererWithCopy = MarkerCodeRendererWithCopy;
//# sourceMappingURL=MarkerCodeRendererWithCopy.js.map