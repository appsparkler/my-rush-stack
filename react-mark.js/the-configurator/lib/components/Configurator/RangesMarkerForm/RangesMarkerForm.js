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
exports.RangesMarkerForm = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const mui_1 = require("mui");
const DynamicKeyValueList_1 = require("../KeywordForm/DynamicKeyValueList");
const fp_1 = require("lodash/fp");
const utils_1 = require("../../../utils");
const reduceValuesToString = (0, fp_1.reduce)((acc, item) => {
    if (item.value) {
        return [...acc, String(item.value)];
    }
    return [...acc];
}, []);
const getRefinedConfig = (rawConfig, defaultConfig) => {
    var _a;
    const excludeValue = reduceValuesToString(rawConfig.exclude);
    return {
        className: defaultConfig.className === rawConfig.className
            ? undefined
            : rawConfig.className,
        debug: defaultConfig.debug === rawConfig.debug ? undefined : rawConfig.debug,
        element: defaultConfig.element === rawConfig.element
            ? undefined
            : rawConfig.element,
        exclude: excludeValue.length === ((_a = defaultConfig.exclude) === null || _a === void 0 ? void 0 : _a.length)
            ? undefined
            : excludeValue,
        iframes: defaultConfig.iframes === rawConfig.iframes
            ? undefined
            : rawConfig.iframes,
        iframesTimeout: defaultConfig.iframesTimeout === rawConfig.iframesTimeout
            ? undefined
            : rawConfig.iframesTimeout,
    };
};
const defaultConfig = {
    className: '',
    debug: false,
    element: 'mark',
    exclude: [],
    iframes: false,
    iframesTimeout: 5000,
};
const RangesMarkerForm = ({ ranges = [{ length: 4, start: 7 }], onChangeOptions = fp_1.noop, onChangeRanges = fp_1.noop, }) => {
    const [config, setConfig] = (0, react_1.useState)(Object.assign(Object.assign({}, defaultConfig), { className: '', debug: false, element: 'mark', exclude: [(0, mui_1.getDefaultInteactiveSimpleListItem)()], iframes: false, iframesTimeout: 5000 }));
    const [rawRanges, setRawRanges] = (0, react_1.useState)((0, fp_1.map)((range) => ({
        field1: {
            label: 'start',
            size: 'small',
            type: 'number',
            value: range.start,
        },
        field2: {
            label: 'length',
            size: 'small',
            type: 'number',
            value: range.length,
        },
        id: (0, fp_1.uniqueId)('range'),
    }))(ranges));
    const handleChangeConfig = (0, react_1.useCallback)((name, value) => {
        setConfig((prevConfig) => (Object.assign(Object.assign({}, prevConfig), { [name]: value })));
    }, []);
    const handleChangeRange = (0, react_1.useCallback)((name, value) => {
        setRawRanges(value);
        const ranges = (0, fp_1.map)((item) => {
            return {
                length: Number(item.field2.value),
                start: Number(item.field1.value),
            };
        })(value);
        onChangeRanges(ranges);
    }, [onChangeRanges]);
    (0, react_1.useEffect)(() => {
        const refinedConfig = getRefinedConfig(config, defaultConfig);
        const refinedConfigValues = (0, fp_1.values)(refinedConfig);
        const someHaveValue = (0, utils_1.someAreTruthy)(refinedConfigValues);
        onChangeOptions(someHaveValue ? refinedConfig : undefined);
    }, [config, onChangeOptions]);
    return (react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
        react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
            react_1.default.createElement(DynamicKeyValueList_1.DynamicKeyValueList, { title: "Ranges", name: "ranges", value: rawRanges, onChange: handleChangeRange })),
        react_1.default.createElement(material_1.Grid, { item: true, xs: 6, sm: 6 },
            react_1.default.createElement(mui_1.Vertical, { gap: 2 },
                react_1.default.createElement(mui_1.SimpleTextField, { fullWidth: true, name: "element", label: "Element", type: "text", size: "small", value: config.element, onChange: handleChangeConfig }),
                react_1.default.createElement(mui_1.InteactiveSimpleList, { label: "exclude", title: "Exclude", name: "exclude", value: config.exclude, onChange: handleChangeConfig }),
                react_1.default.createElement(mui_1.SimpleTextField, { fullWidth: true, name: "iframesTimeout", label: "IFrames Timeout", type: "number", value: config.iframesTimeout, size: "small", onChange: handleChangeConfig }))),
        react_1.default.createElement(material_1.Grid, { item: true, xs: 6, sm: 6 },
            react_1.default.createElement(mui_1.Vertical, { gap: 2 },
                react_1.default.createElement(mui_1.SimpleTextField, { fullWidth: true, name: "className", label: "Class Name", type: "text", size: "small", value: config.className, onChange: handleChangeConfig }),
                react_1.default.createElement(mui_1.Vertical, null,
                    react_1.default.createElement(mui_1.SimpleCheckbox, { label: 'Iframes', name: "iframes", checked: config.iframes, onChange: handleChangeConfig }),
                    react_1.default.createElement(mui_1.SimpleCheckbox, { label: 'Debug', name: "debug", checked: config.debug, onChange: handleChangeConfig }))))));
};
exports.RangesMarkerForm = RangesMarkerForm;
//# sourceMappingURL=RangesMarkerForm.js.map