/// <reference types="react" />
import { TextFieldProps } from '@mui/material';
import { RegExpMarkerOptions } from 'mark.js';
export declare type RegExpFormRawValues = {
    element: string;
    ignoreGroups: number;
    className: string;
    iframesTimeout: number;
    acrossElements: boolean;
    iframes: boolean;
    debug: boolean;
    exclude: TextFieldProps[];
};
export declare type RegExpChangeHandler = (regExpValue: RegExp) => void;
export declare type RegExpFormProps = {
    onChangeRegExp?: RegExpChangeHandler;
    onChangeOptions?: (regExpConfig: RegExpMarkerOptions | undefined) => void;
};
export declare const RegExpForm: ({ onChangeOptions, onChangeRegExp, }: RegExpFormProps) => JSX.Element;
//# sourceMappingURL=RegExpForm.d.ts.map