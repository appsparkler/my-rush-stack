import React, { useEffect, useRef, useState } from 'react';
import MarkJS, { RegExpMarkerOptions } from 'mark.js';

type RegExpMarkerProps = {
  mark?: RegExp;
  options?: RegExpMarkerOptions;
};

export const RegExpMarker = ({
  mark,
  options,
  ...restProps
}: RegExpMarkerProps) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const [markerInstance, setMarkerInstance] = useState();
  useEffect(() => {
    const markerInstance = new MarkJS(markerRef.current);
    // markerInstance;
  }, []);
  return <div ref={markerRef} {...restProps} />;
};
