/// <reference types="react" />
import { TextFieldProps } from '@mui/material';
import { SimpleFormControlChange } from 'common-types';
export declare type DynamicKeyValueListItem = {
    id: string;
    field1: TextFieldProps;
    field2: TextFieldProps;
};
export declare type DynamicKeyValueListProps = {
    title?: string;
    name?: string;
    value?: DynamicKeyValueListItem[];
    onChange?: SimpleFormControlChange<DynamicKeyValueListItem[]>;
};
export declare const uniqueIdKeyValueItem: () => string;
export declare const DynamicKeyValueList: ({ name, title, onChange, value, }: DynamicKeyValueListProps) => JSX.Element;
//# sourceMappingURL=DynamicKeyValueList.d.ts.map