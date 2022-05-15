/// <reference types="react" />
import { FormControlLabelProps } from '@mui/material';
import { SimpleFormControlChange } from 'common-types';
export declare type SimpleCheckboxProps = Partial<Omit<FormControlLabelProps, 'onChange'>> & {
    onChange?: SimpleFormControlChange<boolean>;
    label?: string;
};
export declare const SimpleCheckbox: ({ checked, name, label, onChange, ...restProps }: SimpleCheckboxProps) => JSX.Element;
//# sourceMappingURL=SimpleCheckbox.d.ts.map