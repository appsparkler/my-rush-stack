"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpMarker = void 0;
const react_1 = require("react");
const mark_js_1 = __importDefault(require("mark.js"));
const RegExpMarker = (_a) => {
    var { mark = new RegExp(''), options = {}, As = 'div', children } = _a, restProps = __rest(_a, ["mark", "options", "As", "children"]);
    const markerRef = (0, react_1.useRef)(null);
    const [markerInstance, setMarkerInstance] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (markerInstance) {
            Promise.resolve(markerInstance.unmark()).then(() => {
                try {
                    markerInstance.markRegExp(mark, options);
                }
                catch (error) {
                    console.error('invalid regex', error);
                }
            });
        }
        else {
            const markerInstance = new mark_js_1.default(markerRef.current);
            setMarkerInstance(markerInstance);
        }
    }, [mark, markerInstance, options]);
    return (0, react_1.createElement)(As, Object.assign({ children, ref: markerRef }, restProps));
};
exports.RegExpMarker = RegExpMarker;
//# sourceMappingURL=RegExpMarker.js.map