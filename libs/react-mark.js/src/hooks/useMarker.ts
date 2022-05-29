import MarkJS from 'mark.js';
import { useEffect, useRef, useState } from 'react';

export const useMarker = () => {
  const ref = useRef(null);
  const [marker, setMarker] = useState<MarkJS>();

  useEffect(() => {
    const markJSInstance = new MarkJS(ref.current);
    setMarker(markJSInstance);
  }, []);

  return {
    marker,
    ref,
  };
};
