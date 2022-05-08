/// <reference types="react" />
import { TextFieldProps } from '@mui/material';
export declare type SimpleTextFieldProps = {
    onChange: (name: string, value: string) => void;
} & Omit<TextFieldProps, 'onChange'>;
export declare const SimpleTextField: ({ onChange, ...props }: SimpleTextFieldProps) => JSX.Element;
//# sourceMappingURL=SimpleTextField.d.ts.map