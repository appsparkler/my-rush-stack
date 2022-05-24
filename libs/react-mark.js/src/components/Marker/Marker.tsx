import React, {
  createElement,
  ElementType,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkJS, { MarkOptions } from 'mark.js';

export type MarkerProps = {
  children?: React.ReactNode;
  As?: string | ElementType;
  mark?: string | string[];
  options?: MarkOptions;
};

export const Marker: FC<MarkerProps> = ({
  As = 'div',
  mark = '',
  options = {},
  ...restProps
}) => {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [markInstance, setMarkInstance] = useState<MarkJS>();

  useEffect(() => {
    if (markerRef.current) {
      setMarkInstance(new MarkJS(markerRef.current));
    }
  }, []);

  useEffect(() => {
    if (markInstance) {
      markInstance.mark(mark, options);
    }
  }, [markInstance, mark, options]);

  useEffect(() => {
    if (markInstance) {
      Promise.resolve(markInstance.unmark()).then(() => {
        markInstance.mark(mark, options);
      });
    }
  }, [mark, markInstance, options]);

  return createElement(As, restProps);
  // return <div ref={markerRef}>{children}</div>;
};
