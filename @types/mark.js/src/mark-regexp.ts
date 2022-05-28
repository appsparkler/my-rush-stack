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
