import {
  createElement,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkJS, { RangeMarkerItem, RangesMarkerOptions } from 'mark.js';

type RangesMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
  as?: string | ElementType;
  mark?: RangeMarkerItem[];
  options?: RangesMarkerOptions;
} & T;

export const RangesMarker = ({
  as = 'div',
  mark = [],
  options = {},
  ...restProps
}: RangesMarkerProps) => {
  const ref = useRef(null);

  const [markJSInstance, setMarkJSInstance] = useState<MarkJS>();

  useEffect(() => {
    const markJSInstance = new MarkJS(ref.current);
    setMarkJSInstance(markJSInstance);
  }, []);

  useEffect(() => {
    if (markJSInstance) {
      Promise.resolve(markJSInstance.unmark()).then((res) => {
        markJSInstance.markRanges(mark, options);
      });
    }
  }, [mark, markJSInstance, options]);

  return createElement(as, {
    ref,
    ...restProps,
  });
};
