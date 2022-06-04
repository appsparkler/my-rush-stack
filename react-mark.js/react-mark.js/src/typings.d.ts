declare module "mark.js" {
  import { MarkOptions, UnmarkOptions } from "types";
  class MarkJS {
    constructor(el: Element) {}
    mark(str: string | string[], options?: MarkOptions): void;
    unmark(markOptions?: UnmarkOptions): void;
  }

  export default MarkJS;
}
