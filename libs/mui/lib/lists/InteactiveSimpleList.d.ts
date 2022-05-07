/// <reference types="react" />
declare type ExcludeItem = {
    id: string;
    value: string;
};
export declare type ExcludesProps = {
    title?: string;
    label?: string;
    ariaLabelAdd?: string;
    ariaLabelDelete?: string;
    name?: string;
    onChange?: (name: string, value: ExcludeItem[]) => void;
};
export declare const InteactiveSimpleList: ({ title, label, ariaLabelAdd, ariaLabelDelete, name, onChange, }: ExcludesProps) => JSX.Element;
export {};
//# sourceMappingURL=InteactiveSimpleList.d.ts.map