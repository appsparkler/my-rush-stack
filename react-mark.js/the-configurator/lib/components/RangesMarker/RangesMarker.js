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
exports.RangesMarker = void 0;
const react_1 = require("react");
const mark_js_1 = __importDefault(require("mark.js"));
const RangesMarker = (_a) => {
    var { as = 'div', mark = [], options = {} } = _a, restProps = __rest(_a, ["as", "mark", "options"]);
    const ref = (0, react_1.useRef)(null);
    const [markJSInstance, setMarkJSInstance] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const markJSInstance = new mark_js_1.default(ref.current);
        setMarkJSInstance(markJSInstance);
    }, []);
    (0, react_1.useEffect)(() => {
        if (markJSInstance) {
            Promise.resolve(markJSInstance.unmark()).then((res) => {
                markJSInstance.markRanges(mark, options);
            });
        }
    }, [mark, markJSInstance, options]);
    return (0, react_1.createElement)(as, Object.assign({ ref }, restProps));
};
exports.RangesMarker = RangesMarker;
//# sourceMappingURL=RangesMarker.js.map