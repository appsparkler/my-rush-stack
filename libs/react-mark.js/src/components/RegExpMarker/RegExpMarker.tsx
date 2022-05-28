import React, { createElement, useEffect, useRef, useState } from 'react';
import MarkJS, { RegExpMarkerOptions } from 'mark.js';

/**
 * @public
 */
export type RegExpMarkerProps = {
  mark?: RegExp;
  options?: RegExpMarkerOptions;
  As?: string;
  children: React.ReactNode;
};

/**
 * @public
 */
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
      Promise.resolve(markerInstance.unmark()).then(() => {
        try {
          markerInstance.markRegExp(mark, options);
        } catch (error) {
          console.error('invalid regex', error);
        }
      });
    } else {
      const markerInstance = new MarkJS(markerRef.current);
      setMarkerInstance(markerInstance);
    }
  }, [mark, markerInstance, options]);
  return createElement(As, { children, ref: markerRef, ...restProps });
};
