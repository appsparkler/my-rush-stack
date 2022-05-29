import MarkJS from 'mark.js';
import { useEffect, useRef, useState } from 'react';

/**
 * @public
 */
export type UseMarkerRes = {
  marker: MarkJS;
  markerRef: React.MutableRefObject<any>;
};

/**
 * @public
 */
export const useMarker = (): UseMarkerRes => {
  const markerRef = useRef(null);
  const [marker, setMarker] = useState<MarkJS>();

  useEffect(() => {
    const markJSInstance = new MarkJS(markerRef.current);
    setMarker(markJSInstance);
  }, []);

  return {
    marker,
    markerRef,
  };
};
