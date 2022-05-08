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
// export const Configurator = () => {
//     return
// }
const Configurator = () => {
    const theme = (0, material_1.createTheme)({ palette: { mode: 'light' } });
    console.log({ theme });
    const mark = 'hello world';
    const options = { foo: 'foo', ignore: ['h1', '.hello'] };
    const optionsString = JSON.stringify(options, null, 4).replace('}', `  }`);
    const optionsRender = (0, react_1.useMemo)(() => {
        const showOptions = Object.keys(options).length > 0 ? true : false;
        if (showOptions) {
            return `
  options={${optionsString}}
/>`;
        }
        return `
/>`;
    }, []);
    return (react_1.default.createElement(material_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(material_1.Box, { bgcolor: 'grey.200', p: 2 },
            react_1.default.createElement("pre", null, `
<Marker 
  mark="${mark}"${optionsRender}`),
            react_1.default.createElement("pre", null, JSON.stringify(theme, null, 2)))));
};
exports.Configurator = Configurator;
//# sourceMappingURL=Configurator.js.map