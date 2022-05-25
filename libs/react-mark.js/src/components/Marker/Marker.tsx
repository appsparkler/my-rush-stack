import React, {
  createElement,
  ElementType,
  FC,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkJS, { MarkOptions } from 'mark.js';

export type MarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
  children?: React.ReactNode;
  As?: string | ElementType;
  mark?: string | string[];
  options?: MarkOptions;
} & T;

const X = () => <div about="abcd">Hello</div>;

export const Marker = <T extends {} = HTMLAttributes<HTMLDivElement>>({
  As = 'div',
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

  return createElement(As, { ref: markerRef, ...restProps });
};
