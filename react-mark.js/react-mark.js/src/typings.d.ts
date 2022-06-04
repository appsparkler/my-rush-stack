declare module "mark.js" {
  import {
    MarkOptions,
    RangeMarkerItem,
    RangesMarkerOptions,
    UnmarkOptions,
  } from "types";
  class MarkJS {
    constructor(el: Element): void;
    mark(str: string | string[], options?: MarkOptions): void;
    markRanges(ranges: RangeMarkerItem[], options?: RangesMarkerOptions);
    unmark(markOptions?: UnmarkOptions): void;
  }

  export default MarkJS;
}
