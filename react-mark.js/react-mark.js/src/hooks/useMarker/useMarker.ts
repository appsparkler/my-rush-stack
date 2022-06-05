import MarkJS from "mark.js";
import { useEffect, useRef, useState } from "react";
import {
  MarkOptions,
  RangeMarkerItem,
  RangesMarkerOptions,
  RegExpMarkerOptions,
  UnmarkOptions,
} from "types";

type _MarkJS = {
  mark(str: string | string[], options?: MarkOptions): void;
  markRanges(ranges: RangeMarkerItem[], options?: RangesMarkerOptions): void;
  markRegExp(regExp: RegExp, options?: RegExpMarkerOptions): void;
  unmark(markOptions?: UnmarkOptions): void;
};

/**
 * @public
 */
export interface UseMarkerRes<T = HTMLDivElement> {
  marker: _MarkJS | undefined;
  markerRef: React.MutableRefObject<T | null>;
}

/**
 * @public
 */
export const useMarker = <T extends Element>(): UseMarkerRes<T> => {
  const markerRef = useRef<null | T>(null);
  const [marker, setMarker] = useState<_MarkJS>();

  useEffect(() => {
    if (markerRef.current) {
      const markJSInstance = new MarkJS(markerRef.current);
      setMarker(markJSInstance);
    }
  }, []);

  return {
    marker,
    markerRef,
  };
};
