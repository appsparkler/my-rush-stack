declare module 'mark.js' {
  export type MarkOptions = Partial<{
    /**
     * An array with exclusion selectors. Matches inside these elements will be ignored. Example: "filter": ["h1", ".ignore"]
     */
    exclude?: string[];
  }>;

  export default class MarkJS {

    constructor(context: Element);
    mark: (str: string | string[], options?: MarkOptions) => void;
    unmark: () => void;
  }
}
