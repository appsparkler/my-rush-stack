export namespace languages {
    export const clike: {
        comment: {
            pattern: RegExp;
            lookbehind: boolean;
            greedy: boolean;
        }[];
        string: {
            pattern: RegExp;
            greedy: boolean;
        };
        'class-name': {
            pattern: RegExp;
            lookbehind: boolean;
            inside: {
                punctuation: RegExp;
            };
        };
        keyword: RegExp;
        boolean: RegExp;
        function: RegExp;
        number: RegExp;
        operator: RegExp;
        punctuation: RegExp;
    };
    export const javascript: any;
    import js = javascript;
    export { js };
}
//# sourceMappingURL=prism.d.ts.map