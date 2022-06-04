import { ElementType } from "react";
import { UnmarkOptions } from "./UnmarkOptions";

/**
 * @public
 */
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

/**
 * @public
 */
export type RegExpMarkerProps<T> = {
  mark?: RegExp;
  options?: RegExpMarkerOptions;
  as?: string | ElementType;
  unmarkOptions?: UnmarkOptions;
  children: React.ReactNode;
  elementProps?: T;
};
