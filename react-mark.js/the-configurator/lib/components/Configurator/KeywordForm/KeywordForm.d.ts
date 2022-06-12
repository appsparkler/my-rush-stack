/// <reference types="react" />
import { TextFieldProps } from '@mui/material';
import { DynamicKeyValueListItem } from './DynamicKeyValueList';
import { MarkOptions } from 'mark.js';
export declare type KeywordFormRawConfig = Omit<MarkOptions, 'exclude' | 'ignorePunctuation' | 'synonyms'> & {
    exclude: TextFieldProps[];
    ignorePunctuation: TextFieldProps[];
    synonyms: DynamicKeyValueListItem[];
};
export declare type TextFieldPropsValue = TextFieldProps['value'];
export declare const getRefinedConfig: ({ exclude, element, className, accuracy, synonyms, iframesTimeout, wildcards, iframes, ignoreJoiners, acrossElements, caseSensitive, debug, diacritics, ignorePunctuation, separateWordSearch, }: KeywordFormRawConfig) => MarkOptions;
export declare type KeywordFormPropsOnChange = (keywordFormConfig: MarkOptions | undefined) => void;
export declare type KeywordFormPropsOnChangeKeyword = (keyword: string) => void;
export declare type KeywordFormProps = {
    onChange?: KeywordFormPropsOnChange;
    onChangeKeyword?: KeywordFormPropsOnChangeKeyword;
    isKeywordsArray?: boolean;
    keyword?: string;
};
export declare const KeywordForm: ({ keyword, onChange, onChangeKeyword, isKeywordsArray, }: KeywordFormProps) => JSX.Element;
//# sourceMappingURL=KeywordForm.d.ts.map