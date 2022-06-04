import { MarkOptions } from "./MarkOptions";

declare module "mark.js" {
  class MarkJS {
    mark(str: string | string[], options?: MarkOptions): void;
  }
}
