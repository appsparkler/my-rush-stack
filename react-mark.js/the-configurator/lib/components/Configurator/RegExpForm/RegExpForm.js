"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpForm = void 0;
const material_1 = require("@mui/material");
const react_1 = require("react");
const utils_1 = require("../../../utils");
const mui_1 = require("mui");
const fp_1 = require("lodash/fp");
const react_2 = __importDefault(require("react"));
const defaultConfig = {
    acrossElements: false,
    className: '',
    debug: false,
    done: () => { },
    each: () => { },
    element: 'mark',
    exclude: [],
    filter: () => { },
    iframes: false,
    iframesTimeout: 5000,
    ignoreGroups: 0,
    log: console,
    noMatch: () => { },
};
const getRefinedOptions = (options) => {
    const { acrossElements, className, debug, element, exclude, iframes, iframesTimeout, ignoreGroups, } = options;
    const excludeValue = (0, utils_1.getValues)(exclude);
    return {
        acrossElements: acrossElements === defaultConfig.acrossElements
            ? undefined
            : acrossElements,
        className: className === defaultConfig.className ? undefined : className,
        debug: debug === defaultConfig.debug ? undefined : debug,
        done: undefined,
        each: undefined,
        element: element === defaultConfig.element ? undefined : element,
        exclude: excludeValue.length > 0 ? excludeValue : undefined,
        filter: undefined,
        iframes: iframes === defaultConfig.iframes ? undefined : iframes,
        iframesTimeout: iframesTimeout === defaultConfig.iframesTimeout
            ? undefined
            : Number(iframesTimeout),
        ignoreGroups: defaultConfig.ignoreGroups === ignoreGroups
            ? undefined
            : Number(ignoreGroups),
        log: undefined,
        noMatch: undefined,
    };
};
const RegExpForm = ({ onChangeOptions = fp_1.noop, onChangeRegExp = fp_1.noop, }) => {
    const [regexp, setRegexp] = (0, react_1.useState)('/Lorem/');
    const [options, setOptions] = (0, react_1.useState)({
        acrossElements: false,
        className: '',
        debug: false,
        element: 'mark',
        exclude: [(0, mui_1.getDefaultInteactiveSimpleListItem)()],
        iframes: false,
        iframesTimeout: 5000,
        ignoreGroups: 0,
    });
    const handleChange = (0, react_1.useCallback)((key, value) => {
        switch (key) {
            case 'regexp':
                setRegexp(value);
                break;
            default:
                setOptions((prevState) => (Object.assign(Object.assign({}, prevState), { [key]: value })));
        }
    }, []);
    (0, react_1.useEffect)(() => {
        onChangeRegExp((0, utils_1.stringToRegex)(regexp));
    }, [onChangeRegExp, regexp]);
    (0, react_1.useEffect)(() => {
        const refinedOptions = getRefinedOptions(options);
        const refinedOptionValues = (0, fp_1.values)(refinedOptions);
        const someHaveDefinedValues = (0, utils_1.someAreTruthy)(refinedOptionValues);
        onChangeOptions(someHaveDefinedValues ? refinedOptions : undefined);
    }, [onChangeOptions, options]);
    return (react_2.default.createElement(material_1.Grid, { container: true, spacing: 2 },
        react_2.default.createElement(material_1.Grid, { item: true, xs: 6 },
            react_2.default.createElement(mui_1.Vertical, { gap: 2 },
                react_2.default.createElement(mui_1.SimpleTextField, { fullWidth: true, label: "RegExp", name: "regexp", value: regexp, size: "small", onChange: handleChange }),
                react_2.default.createElement(mui_1.SimpleTextField, { fullWidth: true, label: "Element", name: "element", value: options.element, size: "small", onChange: handleChange }),
                react_2.default.createElement(mui_1.InteactiveSimpleList, { title: "Exclude", label: "exclude", value: options.exclude, name: "exclude", onChange: handleChange }),
                react_2.default.createElement(mui_1.SimpleTextField, { fullWidth: true, type: "number", label: "IFrames Timeout", name: "iframesTimeout", value: options.iframesTimeout, size: "small", onChange: handleChange }))),
        react_2.default.createElement(material_1.Grid, { item: true, xs: 6 },
            react_2.default.createElement(mui_1.Vertical, { gap: 2 },
                react_2.default.createElement(mui_1.SimpleTextField, { fullWidth: true, label: "Class Name", name: "className", value: options.className, size: "small", onChange: handleChange }),
                react_2.default.createElement(mui_1.SimpleTextField, { fullWidth: true, type: "number", label: "Ignore Groups", name: "ignoreGroups", value: options.ignoreGroups, size: "small", onChange: handleChange }),
                react_2.default.createElement(mui_1.Vertical, null,
                    react_2.default.createElement(mui_1.SimpleCheckbox, { label: "Across Elements", name: "acrossElements", value: options.acrossElements, onChange: handleChange }),
                    react_2.default.createElement(mui_1.SimpleCheckbox, { label: "IFrames", name: "iframes", value: options.iframes, onChange: handleChange }),
                    react_2.default.createElement(mui_1.SimpleCheckbox, { label: "Debug", name: "debug", value: options.debug, onChange: handleChange }))))));
};
exports.RegExpForm = RegExpForm;
//# sourceMappingURL=RegExpForm.js.map