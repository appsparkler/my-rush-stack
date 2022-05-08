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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marker = void 0;
const react_1 = __importStar(require("react"));
const mark_js_1 = __importDefault(require("mark.js"));
const Marker = ({ children, mark = '', options, }) => {
    const markerRef = (0, react_1.useRef)(null);
    const [markInstance, setMarkInstance] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (markerRef.current) {
            setMarkInstance(new mark_js_1.default(markerRef.current));
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (markInstance) {
            markInstance.mark(mark, options);
        }
    }, [markInstance, mark, options]);
    (0, react_1.useEffect)(() => {
        if (markInstance) {
            Promise.resolve(markInstance.unmark()).then(() => {
                markInstance.mark(mark, options);
            });
        }
    }, [mark, markInstance, options]);
    return react_1.default.createElement("div", { ref: markerRef }, children);
};
exports.Marker = Marker;
//# sourceMappingURL=Marker.js.map