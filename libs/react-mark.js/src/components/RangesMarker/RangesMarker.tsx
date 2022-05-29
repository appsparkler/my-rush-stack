import {
  createElement,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import MarkJS, {
  RangeMarkerItem,
  RangesMarkerOptions,
  UnmarkOptions,
} from 'mark.js';

/**
 * @public
 */
export type RangesMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
  as?: string | ElementType;
  mark?: RangeMarkerItem[];
  options?: RangesMarkerOptions;
  unmarkOptions?: UnmarkOptions;
} & T;

/**
 * @public
 */
export const RangesMarker = <T,>({
  as = 'div',
  mark = [],
  options = {},
  unmarkOptions = {},
  ...restProps
}: RangesMarkerProps<T>) => {
  const ref = useRef(null);

  const [markJSInstance, setMarkJSInstance] = useState<MarkJS>();

  useEffect(() => {
    const markJSInstance = new MarkJS(ref.current);
    setMarkJSInstance(markJSInstance);
  }, []);

  useEffect(() => {
    if (markJSInstance) {
      Promise.resolve(markJSInstance.unmark(unmarkOptions)).then((res) => {
        markJSInstance.markRanges(mark, options);
      });
    }
  }, [mark, markJSInstance, options, unmarkOptions]);

  return createElement(as, {
    ref,
    ...restProps,
  });
};
