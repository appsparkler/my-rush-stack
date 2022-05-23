import React, { createElement, useEffect, useRef, useState } from 'react';
import MarkJS, { RegExpMarkerOptions } from 'mark.js';

type RegExpMarkerProps = {
  mark?: RegExp;
  options?: RegExpMarkerOptions;
  As?: string;
  children: React.ReactNode;
};

export const RegExpMarker: React.FC<RegExpMarkerProps> = ({
  mark = new RegExp(''),
  options = {},
  As = 'div',
  children,
  ...restProps
}) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const [markerInstance, setMarkerInstance] = useState<MarkJS>();
  useEffect(() => {
    if (markerInstance) {
      markerInstance.markRegExp(mark, options);
    } else {
      const markerInstance = new MarkJS(markerRef.current);
      setMarkerInstance(markerInstance);
    }
  }, [mark, markerInstance, options]);
  return createElement(As, { children, ref: markerRef, ...restProps });
};
