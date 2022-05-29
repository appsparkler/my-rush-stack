"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMarker = void 0;
const mark_js_1 = __importDefault(require("mark.js"));
const react_1 = require("react");
/**
 * @public
 */
const useMarker = () => {
    const markerRef = (0, react_1.useRef)(null);
    const [marker, setMarker] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const markJSInstance = new mark_js_1.default(markerRef.current);
        setMarker(markJSInstance);
    }, []);
    return {
        marker,
        markerRef,
    };
};
exports.useMarker = useMarker;
//# sourceMappingURL=useMarker.js.map