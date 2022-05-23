export * from "./mark-options";
export * from "./mark-regexp-options";
import { MarkOptions } from "./mark-options";
import { RegExpMarkerOptions } from "./mark-regexp-options";

export default class MarkJS {
  constructor(context: Element);
  mark: (str: string | string[], options?: MarkOptions) => void;
  markRegExp: (str: RegExp, options?: RegExpMarkerOptions) => void;
  unmark: () => void;
}

// declare module "mark.js" {
//   export default class MarkJS {
//     constructor(context: Element);
//     mark: (str: string | string[], options?: MarkOptions) => void;
//     markRegExp: (str: RegExp, options?: RegExpMarkerOptions) => void;
//     unmark: () => void;
//   }
// }
