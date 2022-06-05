import MarkJS from "mark.js";
import { MarkJS as MarkJSType } from "types";
import { useEffect, useRef, useState } from "react";

/**
 * @public
 */
export interface UseMarkerRes<T = HTMLDivElement> {
  marker: MarkJSType | undefined;
  markerRef: React.MutableRefObject<T | null>;
}

/**
 * @public
 */
export const useMarker = <T extends Element>(): UseMarkerRes<T> => {
  const markerRef = useRef<null | T>(null);
  const [marker, setMarker] = useState<MarkJSType>();

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
