/**
 * @public
 */
export type Accuracy = "partially" | "complimentary" | "exactly";

/**
 * @public
 */
export type WildCards = "disabled" | "enabled" | "withSpaces";

/**
 * @public
 */
export type MarkOptions = Partial<{
  /**
   * An array with exclusion selectors. Matches inside these elements will be ignored. Example: "filter": ["h1", ".ignore"]
   * @defaultValue `[]`
   */
  exclude: string[];
  /**
   *
   *  Either one of the following string values:
      - "partially": When searching for "lor" only "lor" inside "lorem" will be marked
      - "complementary": When searching for "lor" the whole word "lorem" will be marked
      - "exactly": When searching for "lor" only those exact words with a word boundary will be marked. In this example nothing inside "lorem". This value is equivalent to the previous option wordBoundary

      Or an object containing two properties:
      - "value": One of the above named string values
      - "limiters": A custom array of string limiters for accuracy "exactly" or "complementary". Read more about this in the tutorials section

      @defaultValue `"partially"`
   */
  accuracy: Accuracy;
  /**
   * Whether to search for matches across elements
   * @defaultValue `false`
   */
  acrossElements: boolean;
  /**
   * Whether to search case sensitive
   * @defaultValue `false`
   */
  caseSensitive: boolean;
  /**
   * A class name that will be appended to element
   * @defaultValue `""`
   */
  className: string;
  /**
   * Set this option to true if you want to log messages
   * @defaultValue `false`
   */
  debug: boolean;
  /**
   * If [diacritic](https://en.wikipedia.org/wiki/Diacritic) characters should be matched. For example "piękny" would also match "piekny" and "doner" would also match "döner"
   * @defaultValue `true`
   */
  diacritics: boolean;
  /**
   * A callback for each marked element. Receives the marked DOM element as a parameter
   */
  done: (el: Element) => void;
  /**
   * A callback for each marked element. Receives the marked DOM element as a parameter
   */
  each: (_markedDomElement: Element) => void;
  /** HTML element to wrap matches, e.g. `span`,
   * @defaultValue `mark`
   */
  element: string;
  /**
   * A callback to filter or limit matches. It will be called for each match and receives the following parameters:

    1. The text node which includes the match
    1. The term that has been found
    1. A counter indicating the total number of all marks at the time of the function call
    1. A counter indicating the number of marks for the term

The function must return false if the mark should be stopped, otherwise true
   */
  filter: (textNode: Element, term: string, numberOfMarks: number) => void;
  /**
   * Whether to search also inside iframes. If you don't have permissions to some iframes (e.g. because they have a [different origin](https://en.wikipedia.org/wiki/Same-origin_policy)) they will be silently skipped. If you don't want to search inside specific iframes (e.g. facebook share), you can pass an `exclude` selector that matches these iframes
   * @defaultValue `false`
   */
  iframes: boolean;
  /**
   * The maximum ms to wait for a `load` event before skipping an iframe. Especially important when there's no internet connection or a browser "offline" mode is enabled and an iframe has an online `src` – then the `load` event is never fired
   * @defaultValue `5000`
   */
  iframesTimeout: number;
  /**
   * Whether to also find matches that contain soft hyphen, zero width space, zero width non-joiner and zero width joiner. They're used to indicate a point for a line break where there isn't enough space to show the full word
   * @defaultValue `false`
   */
  ignoreJoiners: boolean;
  /**
   * An array of punctuation mark strings. These punctuation marks can be between any characters, e.g. setting this option to ["'"] would match "Worlds", "World's" and "Wo'rlds". One or more apostrophes between the letters would still produce a match (e.g. "W'o''r'l'd's"). A typical setting for this option could be as follows: `":;.,-–—‒_(){}[]!'\"+=".split("")`
   * @defaultValue `[]`
   */
  ignorePunctuation: string[];
  /**
   * Log messages to a specific object (only if `debug` is true)
   * @defaultValue `console`
   */
  log: Console;
  /**
   * A callback function that will be called when there are no matches. Receives the not found term as a parameter
   */
  noMatch: (term: string | string[]) => void;
  /**
   * Whether to search for each word separated by a blank instead of the complete term
   * @defaultValue `true`
   */
  separateWordSearch: boolean;
  /**
   * An object with synonyms. The key will be a synonym for the value and the value for the key. Example: `"synonyms": {"one": "1"}` will add the synonym "1" for "one" and vice versa
   * @defaultValue `{}`
   */
  synonyms: Record<string, string>;
  /**
   * Set to any of the following string values:
    - "disabled": Disable wildcard usage
    - "enabled": When searching for "lor?m", the "?" will match zero or one non-space character (e.g. - "lorm", "loram", "lor3m", etc). When searching for "lor*m", the "*" will match zero or more non-space characters (e.g. "lorm", "loram", "lor123m", etc).
    - "withSpaces": When searching for "lor?m", the "?" will match zero or one space or non-space character (e.g. "lor m", "loram", etc). When searching for "lor*m", the "*" will match zero or more space or non-space characters (e.g. "lorm", "lore et dolor ipsum", "lor: m", etc).
    @defaultValue `"disabled"`
   */
  wildcards: WildCards;
}>;

const x: MarkOptions = {
  element: "span",
  className: "abc-def",
};
