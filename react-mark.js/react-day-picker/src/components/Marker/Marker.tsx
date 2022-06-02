import React, {
  createElement,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkJS, { MarkOptions, UnmarkOptions } from 'mark.js';

/**
 * @public
 */
export type MarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
  children?: React.ReactNode;
  as?: string | ElementType;
  mark?: string | string[];
  options?: MarkOptions;
  unmarkOptions?: UnmarkOptions;
} & T;

/**
 * @public
 */
export const Marker = <T extends {} = HTMLAttributes<HTMLDivElement>>({
  as = 'div',
  mark = '',
  options = {},
  unmarkOptions = {},
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
      Promise.resolve(markInstance.unmark(unmarkOptions)).then(() => {
        markInstance.mark(mark, options);
      });
    }
  }, [mark, markInstance, options, unmarkOptions]);

  return createElement(as, { ref: markerRef, ...restProps });
};
