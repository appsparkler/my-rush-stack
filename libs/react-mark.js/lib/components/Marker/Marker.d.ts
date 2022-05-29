import React, { ElementType, HTMLAttributes } from 'react';
import { MarkOptions, UnmarkOptions } from 'mark.js';
/**
 * @public
 */
export declare type MarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
    children?: React.ReactNode;
    as?: string | ElementType;
    mark?: string | string[];
    options?: MarkOptions;
    unmarkOptions?: UnmarkOptions;
} & T;
/**
 * @public
 */
export declare const Marker: <T extends {} = React.HTMLAttributes<HTMLDivElement>>({ as, mark, options, unmarkOptions, ...restProps }: MarkerProps<T>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=Marker.d.ts.map