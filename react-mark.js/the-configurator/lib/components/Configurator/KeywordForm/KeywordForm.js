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
exports.KeywordForm = exports.getRefinedConfig = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const DynamicKeyValueList_1 = require("./DynamicKeyValueList");
const mui_1 = require("mui");
const fp_1 = require("lodash/fp");
const utils_1 = require("../../../utils");
const defaultConfig = {
    accuracy: 'partially',
    acrossElements: false,
    caseSensitive: false,
    className: '',
    debug: false,
    diacritics: true,
    element: 'mark',
    exclude: [],
    iframes: false,
    iframesTimeout: 5000,
    ignoreJoiners: false,
    ignorePunctuation: [],
    log: console,
    separateWordSearch: true,
    synonyms: {},
    wildcards: 'disabled',
};
// utils
const getRefinedSynonyms = (synonyms) => {
    return (0, fp_1.reduce)((acc, item) => {
        if (Boolean(item.field1.value) && Boolean(item.field2.value)) {
            return Object.assign(Object.assign({}, acc), { [item.field1.value]: item.field2.value });
        }
        return acc;
    }, {})(synonyms);
};
const getRefinedConfig = ({ exclude, element, className, accuracy, synonyms, iframesTimeout, wildcards, iframes, ignoreJoiners, acrossElements, caseSensitive, debug, diacritics, ignorePunctuation, separateWordSearch, }) => {
    const excludesValue = (0, utils_1.getValues)(exclude);
    const punctuationsValue = (0, utils_1.getValues)(ignorePunctuation);
    const synonymsValue = getRefinedSynonyms(synonyms);
    return {
        accuracy: accuracy === defaultConfig.accuracy ? undefined : accuracy,
        acrossElements: defaultConfig.acrossElements === acrossElements
            ? undefined
            : acrossElements,
        caseSensitive: defaultConfig.caseSensitive === caseSensitive ? undefined : caseSensitive,
        className: defaultConfig.className === className ? undefined : className,
        debug: debug === defaultConfig.debug ? undefined : debug,
        diacritics: diacritics === defaultConfig.diacritics ? undefined : diacritics,
        element: defaultConfig.element === element ? undefined : element,
        exclude: excludesValue.length ? excludesValue : undefined,
        iframes: iframes === defaultConfig.iframes ? undefined : iframes,
        iframesTimeout: iframesTimeout === defaultConfig.iframesTimeout
            ? undefined
            : Number(iframesTimeout),
        ignoreJoiners: ignoreJoiners === defaultConfig.ignoreJoiners ? undefined : ignoreJoiners,
        ignorePunctuation: punctuationsValue.length ? punctuationsValue : undefined,
        separateWordSearch: separateWordSearch === defaultConfig.separateWordSearch
            ? undefined
            : separateWordSearch,
        synonyms: (0, fp_1.keys)(synonymsValue).length ? synonymsValue : undefined,
        wildcards: defaultConfig.wildcards === wildcards ? undefined : wildcards,
    };
};
exports.getRefinedConfig = getRefinedConfig;
// JSX
const KeywordForm = ({ keyword = 'Lorem Ipsum', onChange = fp_1.noop, onChangeKeyword = fp_1.noop, isKeywordsArray = false, }) => {
    const [keywordArray, setKeywordArray] = (0, react_1.useState)(JSON.stringify(['Lorem', 'Ipsum']));
    const [config, setConfig] = (0, react_1.useState)(Object.assign(Object.assign({}, defaultConfig), { accuracy: 'partially', exclude: [(0, mui_1.getDefaultInteactiveSimpleListItem)()], ignorePunctuation: [(0, mui_1.getDefaultInteactiveSimpleListItem)()], synonyms: [
            {
                field1: {
                    label: 'keyword',
                    size: 'small',
                    value: '',
                },
                field2: {
                    label: 'synonym',
                    size: 'small',
                    value: '',
                },
                id: (0, fp_1.uniqueId)('synonym-key'),
            },
        ], wildcards: 'disabled' }));
    const handleChange = (0, react_1.useCallback)((key, value) => {
        if (key === 'keyword') {
            if (isKeywordsArray) {
                setKeywordArray(value);
                onChangeKeyword(value);
            }
            else {
                onChangeKeyword(value);
            }
        }
        else {
            setConfig((prevConfig) => (Object.assign(Object.assign({}, prevConfig), { [key]: value })));
        }
    }, [isKeywordsArray, onChangeKeyword]);
    const isErrorKeyword = (0, react_1.useMemo)(() => {
        if (isKeywordsArray) {
            try {
                const parsedValue = JSON.parse(keywordArray);
                if ((0, fp_1.isArray)(parsedValue))
                    return false;
                return true;
            }
            catch (e) {
                return true;
            }
        }
    }, [isKeywordsArray, keywordArray]);
    (0, react_1.useEffect)(() => {
        const refinedConfig = (0, exports.getRefinedConfig)(config);
        const pickedValues = (0, fp_1.pickBy)((x) => typeof x !== 'undefined')(refinedConfig);
        onChange(pickedValues);
    }, [config, onChange]);
    return (react_1.default.createElement(mui_1.Vertical, { gap: 2 },
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 6 },
                react_1.default.createElement(mui_1.Vertical, { gap: 2 },
                    react_1.default.createElement(mui_1.SimpleTextField, { sx: { flexBasis: 0 }, label: "Keyword", fullWidth: true, size: "small", onChange: handleChange, name: "keyword", value: keyword, error: isErrorKeyword }),
                    react_1.default.createElement(mui_1.SimpleTextField, { label: "Element", fullWidth: true, size: "small", value: config.element, name: "element", onChange: handleChange }),
                    react_1.default.createElement(DynamicKeyValueList_1.DynamicKeyValueList, { name: "synonyms", onChange: handleChange, value: config.synonyms, title: "Synonyms" }),
                    react_1.default.createElement(mui_1.InteactiveSimpleList, { name: "exclude", title: "Exclusions", label: "Exclude Item", ariaLabelAdd: "add exclusion", ariaLabelDelete: "delete exclusion", value: config.exclude, onChange: handleChange }),
                    react_1.default.createElement(mui_1.InteactiveSimpleList, { name: "ignorePunctuation", title: "Ignore Punctuation", label: "for ex: .", ariaLabelAdd: "add punctuation to ignore", ariaLabelDelete: "delete punctuation to ignore", value: config.ignorePunctuation, onChange: handleChange }),
                    react_1.default.createElement(mui_1.SimpleTextField, { type: "number", label: "IFrames Timeout", fullWidth: true, size: "small", name: "iframesTimeout", value: config.iframesTimeout, onChange: handleChange }),
                    react_1.default.createElement(mui_1.SimpleSelect, { label: "Wild Cards", onChange: handleChange, value: config.wildcards, name: "wildCards", menuItems: [
                            { id: '1', name: 'disabled', value: 'disabled' },
                            { id: '2', name: 'enabled', value: 'enabled' },
                            { id: '3', name: 'withSpaces', value: 'withSpaces' },
                        ] }))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 6 },
                react_1.default.createElement(mui_1.Vertical, { gap: 2 },
                    react_1.default.createElement(mui_1.SimpleSelect, { label: "Accurracy", onChange: handleChange, value: config.accuracy, name: "accuracy", menuItems: [
                            { id: '1', name: 'partially', value: 'partially' },
                            { id: '2', name: 'exactly', value: 'exactly' },
                            { id: '3', name: 'complimentary', value: 'complimentary' },
                        ] }),
                    react_1.default.createElement(mui_1.SimpleTextField, { label: "Class name", fullWidth: true, size: "small", onChange: handleChange, name: "className", value: config.className }),
                    react_1.default.createElement(mui_1.Vertical, null,
                        react_1.default.createElement(mui_1.SimpleCheckbox, { label: "Separate World Search", checked: config.separateWordSearch, name: "separateWordSearch", onChange: handleChange }),
                        react_1.default.createElement(mui_1.SimpleCheckbox, { label: "Diacritics", name: "diacritics", checked: config.diacritics, onChange: handleChange }),
                        react_1.default.createElement(mui_1.SimpleCheckbox, { label: "IFrames", name: "iframes", onChange: handleChange, checked: config.iframes }),
                        react_1.default.createElement(mui_1.SimpleCheckbox, { label: "Case Sensitive", name: "caseSensitive", onChange: handleChange, checked: config.caseSensitive }),
                        react_1.default.createElement(mui_1.SimpleCheckbox, { label: "Ignore Joiners", name: "ignoreJoiners", onChange: handleChange, checked: config.ignoreJoiners }),
                        react_1.default.createElement(mui_1.SimpleCheckbox, { label: "Across Elements", name: "acrossElements", onChange: handleChange, checked: config.acrossElements }),
                        react_1.default.createElement(mui_1.SimpleCheckbox, { label: "Debug", name: "debug", onChange: handleChange, checked: config.debug })))))));
};
exports.KeywordForm = KeywordForm;
//# sourceMappingURL=KeywordForm.js.map