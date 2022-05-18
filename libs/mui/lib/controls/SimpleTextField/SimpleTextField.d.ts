/// <reference types="react" />
import { TextFieldProps } from '@mui/material';
import { SimpleFormControlChange } from 'common-types';
export declare type SimpleTextFieldProps = {
    onChange?: SimpleFormControlChange<string>;
} & Omit<TextFieldProps, 'onChange'>;
export declare const SimpleTextField: ({ onChange, ...props }: SimpleTextFieldProps) => JSX.Element;
//# sourceMappingURL=SimpleTextField.d.ts.map