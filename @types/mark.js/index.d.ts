declare module "mark.js" {
  export type WildCards = "disabled" | "enabled" | "withSpaces";

  export type Accuracy = "partially" | "complimentary" | "exactly";

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

  export type MarkOptions = Partial<{
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

  export default class MarkJS {
    constructor(context: Element);
    mark: (str: string | string[], options?: MarkOptions) => void;
    markRegExp: (str: RegExp, options?: RegExpMarkerOptions) => void;
    unmark: () => void;
  }
}
