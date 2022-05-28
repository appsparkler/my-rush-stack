"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeForm = void 0;
const KeywordForm_1 = require("../KeywordForm");
const react_1 = require("react");
const material_1 = require("@mui/material");
const RegExpForm_1 = require("../RegExpForm");
const RangesMarkerForm_1 = require("../RangesMarkerForm");
const react_2 = __importDefault(require("react"));
const fp_1 = require("lodash/fp");
const CompositeForm = ({ onChange = fp_1.noop }) => {
    const [configType, setConfigType] = (0, react_1.useState)("keyword");
    const [mark, setMark] = (0, react_1.useState)("Lorem Ipsum");
    const [ranges, setRanges] = (0, react_1.useState)();
    const [options, setOptions] = (0, react_1.useState)();
    const handleChangeOptions = (0, react_1.useCallback)((options) => {
        setOptions(options);
    }, []);
    const handleChangeKeyword = (0, react_1.useCallback)((keyword) => {
        setMark(keyword);
    }, []);
    const handleChangeRegExp = (0, react_1.useCallback)((keyword) => {
        setMark(keyword);
    }, []);
    const handleChangeConfigType = (0, react_1.useCallback)((_evt, value) => {
        const valueRef = value;
        setConfigType(valueRef);
        if (valueRef === "keyword") {
            setMark("Lorem Ipsum");
        }
        else if (valueRef === "keywordArray") {
            setMark(JSON.stringify(["Lorem", "Ipsum"]));
        }
        else if (valueRef === "regExp") {
            setMark(/Lorem/);
        }
        else if (valueRef === "ranges") {
            setRanges([{ length: 7, start: 3 }]);
            setMark([{ length: 7, start: 3 }]);
        }
    }, []);
    const handleChangeRanges = (0, react_1.useCallback)((ranges) => {
        setRanges(ranges);
        setMark(ranges);
    }, []);
    const isKeywordsArray = (0, react_1.useMemo)(() => configType === "keywordArray" || configType === "regExp", [configType]);
    const isRangesMarker = (0, react_1.useMemo)(() => configType === "ranges", [configType]);
    const markerType = (0, react_1.useMemo)(() => {
        if (configType === "keyword" || configType === "keywordArray")
            return "Marker";
        if (configType === "ranges")
            return "RangesMarker";
        return "RegExpMarker";
    }, [configType]);
    (0, react_1.useEffect)(() => {
        onChange({
            isMarkArray: isKeywordsArray,
            isRangesMarker: isRangesMarker,
            mark,
            markerType,
            options: options,
            ranges,
        });
    }, [
        isKeywordsArray,
        isRangesMarker,
        options,
        mark,
        markerType,
        onChange,
        ranges,
    ]);
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(material_1.RadioGroup, { "aria-labelledby": "config-type", name: "config-type", value: configType, row: true, onChange: handleChangeConfigType, sx: { my: 1 } },
            react_2.default.createElement(material_1.FormControlLabel, { value: "keyword", control: react_2.default.createElement(material_1.Radio, null), label: "Keyword" }),
            react_2.default.createElement(material_1.FormControlLabel, { value: "keywordArray", control: react_2.default.createElement(material_1.Radio, null), label: "Array Of Keywords" }),
            react_2.default.createElement(material_1.FormControlLabel, { value: "regExp", control: react_2.default.createElement(material_1.Radio, null), label: "Custom RegExp" }),
            react_2.default.createElement(material_1.FormControlLabel, { value: "ranges", control: react_2.default.createElement(material_1.Radio, null), label: "Ranges" })),
        configType === "keyword" || configType === "keywordArray" ? (react_2.default.createElement(KeywordForm_1.KeywordForm, { keyword: mark, isKeywordsArray: isKeywordsArray, onChange: handleChangeOptions, onChangeKeyword: handleChangeKeyword })) : null,
        configType === "regExp" ? (react_2.default.createElement(RegExpForm_1.RegExpForm, { onChangeRegExp: handleChangeRegExp, onChangeOptions: handleChangeOptions })) : null,
        isRangesMarker ? (react_2.default.createElement(RangesMarkerForm_1.RangesMarkerForm, { ranges: mark, onChangeRanges: handleChangeRanges, onChangeOptions: handleChangeOptions })) : null));
};
exports.CompositeForm = CompositeForm;
//# sourceMappingURL=CompositeForm.js.map