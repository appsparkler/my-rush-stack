export * from "./mark";
export * from "./mark-regexp";
export * from "./mark-ranges";
export * from "./unmark";

import { MarkOptions } from "./mark";
import { RangeMarkerItem, RangesMarkerOptions } from "./mark-ranges";
import { RegExpMarkerOptions } from "./mark-regexp";
import { UnmarkOptions } from "./unmark";

/**
 * @public
 */
export default class MarkJS {
  constructor(context: Element) {}
  mark: (str: string | string[], options?: MarkOptions) => void;
  markRegExp: (str: RegExp, options?: RegExpMarkerOptions) => void;
  unmark: (options?: UnmarkOptions) => void;
  markRanges: (
    ranges: RangeMarkerItem[],
    options?: RangesMarkerOptions
  ) => void;
}
