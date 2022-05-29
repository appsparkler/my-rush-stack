import { ElementType, HTMLAttributes } from 'react';
import { RangeMarkerItem, RangesMarkerOptions } from 'mark.js';
/**
 * @public
 */
export declare type RangesMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
    as?: string | ElementType;
    mark?: RangeMarkerItem[];
    options?: RangesMarkerOptions;
} & T;
/**
 * @public
 */
export declare const RangesMarker: <T>({ as, mark, options, ...restProps }: RangesMarkerProps<T>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
//# sourceMappingURL=RangesMarker.d.ts.map