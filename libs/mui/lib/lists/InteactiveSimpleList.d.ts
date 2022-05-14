/// <reference types="react" />
import { TextFieldProps } from '@mui/material';
export declare const getDefaultInteactiveSimpleListItem: () => TextFieldProps;
export declare type InteactiveSimpleListProps = {
    title?: string;
    label?: string;
    ariaLabelAdd?: string;
    ariaLabelDelete?: string;
    name?: string;
    value?: TextFieldProps[];
    onChange?: (name: string, value: TextFieldProps[]) => void;
};
export declare const InteactiveSimpleList: ({ title, label, ariaLabelAdd, ariaLabelDelete, name, onChange, value, }: InteactiveSimpleListProps) => JSX.Element;
//# sourceMappingURL=InteactiveSimpleList.d.ts.map