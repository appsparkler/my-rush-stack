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
exports.MarkerDemo = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const react_mark_js_1 = require("react-mark.js");
const Content = () => (react_1.default.createElement(material_1.Typography, null, "Lorem ipsum dolor sit \u0101met, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, one, n\u00F2 sea takimata 1 sanctus est Lorem ipsum dolor sit amet. L\u00F6rem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam lor\u00ADem ipsum nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy. Lore'm ipsu%m dolor sit amet. Lo!rem ipsum."));
const MarkerDemo = ({ mark = '', options = {}, markerType = 'Marker', }) => {
    const $mark = (0, react_1.useMemo)(() => {
        try {
            if (typeof mark === 'string') {
                const parsed = JSON.parse(mark);
                return parsed;
            }
            // is a valid object
        }
        catch (e) {
            // is most probably a string
            return mark;
        }
    }, [mark]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { showMarker, showRangesMarker, showRegExpMarker } = (0, react_1.useMemo)(() => {
        return {
            showMarker: markerType === 'Marker',
            showRangesMarker: markerType === 'RangesMarker',
            showRegExpMarker: markerType === 'RegExpMarker',
        };
    }, [markerType]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        showMarker ? (react_1.default.createElement(react_mark_js_1.Marker, { mark: $mark, options: options },
            react_1.default.createElement(Content, null))) : null,
        showRegExpMarker ? (react_1.default.createElement(react_mark_js_1.RegExpMarker, { mark: mark },
            react_1.default.createElement(Content, null))) : null,
        showRangesMarker ? (react_1.default.createElement(react_mark_js_1.RangesMarker, { mark: mark, options: options },
            react_1.default.createElement(Content, null))) : null));
};
exports.MarkerDemo = MarkerDemo;
//# sourceMappingURL=MarkerDemo.js.map