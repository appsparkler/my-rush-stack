import { ElementType } from "react";
import { UnmarkOptions } from "./UnmarkOptions";

/**
 * @public
 */
export type RangeMarkerItem = {
  start: number;
  length: number;
};

/**
 * @public
 */
export type RangesMarkerOptions = {
  className?: string;
  debug?: boolean;
  element?: string;
  exclude?: string[];
  iframes?: boolean;
  iframesTimeout?: number;
};

/**
 * @public
 */
export interface RangesMarkerProps<T> {
  children?: React.ReactNode;
  as?: string | ElementType;
  mark?: RangeMarkerItem[];
  options?: RangesMarkerOptions;
  unmarkOptions?: UnmarkOptions;
  elementProps?: T;
}
