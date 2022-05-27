export * from './array-utils';
export declare const filterOutFalsy: import("lodash/fp").LodashFilter2x1<string>;
export declare const getValues: <T extends {
    value?: ValueType;
}, ValueType = string>(values: T[]) => string[];
export declare const mapExcludesToValue: <T extends {
    value?: unknown;
}>(values: T[]) => string[];
export declare const stringToRegex: (str: string) => RegExp;
//# sourceMappingURL=index.d.ts.map