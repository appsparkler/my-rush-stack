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
