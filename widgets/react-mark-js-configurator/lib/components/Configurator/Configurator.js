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
exports.Configurator = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const CompositeForm_1 = require("./CompositeForm");
const MarkerCoderRendererWithCodeCopy_1 = require("./MarkerCoderRendererWithCodeCopy");
const MarkerDemo_1 = require("./MarkerDemo");
const Configurator = () => {
    const [markerCodeRendererWithCopyConfig, setMarkerCodeRendererWithCopyConfig,] = (0, react_1.useState)({});
    const handleChangeConfig = (0, react_1.useCallback)((config) => {
        setMarkerCodeRendererWithCopyConfig(config);
    }, []);
    const { mark, options = undefined } = markerCodeRendererWithCopyConfig;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Typography, { variant: "h2" }, "Configurator"),
                react_1.default.createElement(material_1.Typography, { variant: "h5" },
                    "The configurator should help you understand",
                    ' ',
                    react_1.default.createElement("pre", { style: { display: 'inline' } }, "react-mark.js"),
                    " and its API. Just define your custom options to see what will be marked and view the generated code for your application.")),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                react_1.default.createElement(CompositeForm_1.CompositeForm, { onChange: handleChangeConfig })),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                react_1.default.createElement(MarkerDemo_1.MarkerDemo, { mark: mark, options: options, markerType: markerCodeRendererWithCopyConfig.markerType })),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(MarkerCoderRendererWithCodeCopy_1.MarkerCodeRendererWithCopy, Object.assign({}, markerCodeRendererWithCopyConfig))))));
};
exports.Configurator = Configurator;
//# sourceMappingURL=Configurator.js.map