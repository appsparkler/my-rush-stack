import { ElementType, HTMLAttributes } from 'react';
import { RangeMarkerItem, RangesMarkerOptions } from 'mark.js';
declare type RangesMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
    as?: string | ElementType;
    mark?: RangeMarkerItem[];
    options?: RangesMarkerOptions;
} & T;
export declare const RangesMarker: ({ as, mark, options, ...restProps }: RangesMarkerProps) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export {};
//# sourceMappingURL=RangesMarker.d.ts.map