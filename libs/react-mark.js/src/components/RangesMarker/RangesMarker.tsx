import { createElement, ElementType, HTMLAttributes, useRef } from 'react';
import { RangeMarkerItem } from 'mark.js';

type RangesMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
  as?: string | ElementType;
  mark?: [RangeMarkerItem];
} & T;

export const RangesMarker = ({
  as = 'div',
  ...restProps
}: RangesMarkerProps) => {
  const ref = useRef(null);
  return createElement(as, {
    ref,
    ...restProps,
  });
};
