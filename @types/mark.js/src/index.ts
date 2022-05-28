export * from "./mark";
export * from "./mark-regexp";
export * from "./mark-ranges";

import { MarkOptions } from "./mark";
import { RangeMarkerItem, RangesMarkerOptions } from "./mark-ranges";
import { RegExpMarkerOptions } from "./mark-regexp";

/**
 * @public
 */
export default class MarkJS {
  constructor(context: Element) {}
  mark: (str: string | string[], options?: MarkOptions) => void;
  markRegExp: (str: RegExp, options?: RegExpMarkerOptions) => void;
  unmark: () => void;
  markRanges: (
    ranges: RangeMarkerItem[],
    options?: RangesMarkerOptions
  ) => void;
}
