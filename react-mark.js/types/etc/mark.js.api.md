## API Report File for "@types/mark.js"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public (undocumented)
export type Accuracy = "partially" | "complimentary" | "exactly";

// @public (undocumented)
class MarkJS {
    constructor(context: Element);
    // (undocumented)
    mark: (str: string | string[], options?: MarkOptions) => void;
    // (undocumented)
    markRanges: (ranges: RangeMarkerItem[], options?: RangesMarkerOptions) => void;
    // (undocumented)
    markRegExp: (str: RegExp, options?: RegExpMarkerOptions) => void;
    // (undocumented)
    unmark: (options?: UnmarkOptions) => void;
}
export default MarkJS;

// @public (undocumented)
export type MarkOptions = Partial<{
    exclude: string[];
    accuracy: Accuracy;
    acrossElements: boolean;
    caseSensitive: boolean;
    className: string;
    debug: boolean;
    diacritics: boolean;
    done: () => void;
    each: (_markedDomElement: Element) => void;
    element: string;
    filter: (textNode: Element, term: string, numberOfMarks: number) => void;
    iframes: boolean;
    iframesTimeout: number;
    ignoreJoiners: boolean;
    ignorePunctuation: string[];
    log: Console;
    noMatch: () => void;
    separateWordSearch: boolean;
    synonyms: Record<string, string>;
    wildcards: WildCards;
}>;

// @public (undocumented)
export type RangeMarkerItem = {
    start: number;
    length: number;
};

// @public (undocumented)
export type RangesMarkerOptions = {
    className?: string;
    debug?: boolean;
    element?: string;
    exclude?: string[];
    iframes?: boolean;
    iframesTimeout?: number;
};

// @public (undocumented)
export type RegExpMarkerOptions = Partial<{
    element: string;
    className: string;
    exclude: string[];
    iframes: boolean;
    iframesTimeout: number;
    acrossElements: boolean;
    ignoreGroups: number;
    each: () => void;
    filter: () => void;
    noMatch: () => void;
    done: () => void;
    debug: boolean;
    log: Console;
}>;

// @public (undocumented)
export type UnmarkOptions = Partial<{
    element: string;
}>;

// @public (undocumented)
export type WildCards = "disabled" | "enabled" | "withSpaces";

// (No @packageDocumentation comment for this package)

```
