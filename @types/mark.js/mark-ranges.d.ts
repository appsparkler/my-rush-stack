export type RangeMarkerItem = {
  start: number;
  length: number;
};

export type RangesMarkerOptions = {
  className?: string;
  debug?: boolean;
  element?: string;
  exclude?: string[];
  iframes?: boolean;
  iframesTimeout?: number;
};
