/**
 * @public
 */
export declare type Accuracy = "partially" | "complimentary" | "exactly";
/**
 * @public
 */
export declare type WildCards = "disabled" | "enabled" | "withSpaces";
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
//# sourceMappingURL=mark.d.ts.map