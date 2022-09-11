/// <reference types="react" />
export declare type SimpleSelectProps = {
    onChange?: (name: string, value: string) => void;
    name?: string;
    label?: string;
    value?: string;
    menuItems?: {
        id?: string;
        name?: string;
        value?: string;
    }[];
};
export declare const SimpleSelect: ({ name, label, value, menuItems, onChange, }: SimpleSelectProps) => JSX.Element;
//# sourceMappingURL=SimpleSelectField.d.ts.map