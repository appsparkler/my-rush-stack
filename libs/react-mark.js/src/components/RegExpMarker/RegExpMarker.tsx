import React, {
  createElement,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkJS, { RegExpMarkerOptions } from 'mark.js';

/**
 * @public
 */
export type RegExpMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
  mark?: RegExp;
  options?: RegExpMarkerOptions;
  as?: string | ElementType;
  children: React.ReactNode;
} & T;

/**
 * @public
 */
export const RegExpMarker = <T,>({
  mark = new RegExp(''),
  options = {},
  as = 'div',
  ...restProps
}: RegExpMarkerProps<T>) => {
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
  return createElement(as, { ref: markerRef, ...restProps });
};
