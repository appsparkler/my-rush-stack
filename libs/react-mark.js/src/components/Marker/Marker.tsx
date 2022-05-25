import React, {
  createElement,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkJS, { MarkOptions } from 'mark.js';

export type MarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
  children?: React.ReactNode;
  as?: string | ElementType;
  mark?: string | string[];
  options?: MarkOptions;
} & T;

export const Marker = <T extends {} = HTMLAttributes<HTMLDivElement>>({
  as = 'div',
  mark = '',
  options = {},
  ...restProps
}: MarkerProps<T>) => {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [markInstance, setMarkInstance] = useState<MarkJS>();

  useEffect(() => {
    if (markerRef.current) {
      const markInstance = new MarkJS(markerRef.current);
      setMarkInstance(markInstance);
    }
  }, []);

  useEffect(() => {
    if (markInstance) {
      Promise.resolve(markInstance.unmark()).then(() => {
        markInstance.mark(mark, options);
      });
    }
  }, [mark, markInstance, options]);

  return createElement(as, { ref: markerRef, ...restProps });
};
