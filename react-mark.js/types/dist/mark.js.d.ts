/**
 * @public
 */
export declare type Accuracy = "partially" | "complimentary" | "exactly";

/**
 * @public
 */
declare class MarkJS {
    constructor(context: Element);
    mark: (str: string | string[], options?: MarkOptions) => void;
    markRegExp: (str: RegExp, options?: RegExpMarkerOptions) => void;
    unmark: (options?: UnmarkOptions) => void;
    markRanges: (ranges: RangeMarkerItem[], options?: RangesMarkerOptions) => void;
}
export default MarkJS;

/**
 * @public
 */
export declare type MarkOptions = Partial<{
    /**
     * An array with exclusion selectors. Matches inside these elements will be ignored. Example: "filter": ["h1", ".ignore"]
     */
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

/**
 * @public
 */
export declare type RangeMarkerItem = {
    start: number;
    length: number;
};

/**
 * @public
 */
export declare type RangesMarkerOptions = {
    className?: string;
    debug?: boolean;
    element?: string;
    exclude?: string[];
    iframes?: boolean;
    iframesTimeout?: number;
};

/**
 * @public
 */
export declare type RegExpMarkerOptions = Partial<{
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

/**
 * @public
 */
export declare type UnmarkOptions = Partial<{
    /**Will remove only marked elements with this specific element */
    element: string;
}>;

/**
 * @public
 */
export declare type WildCards = "disabled" | "enabled" | "withSpaces";

export { }
