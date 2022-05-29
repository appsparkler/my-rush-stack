import React, { ElementType, HTMLAttributes } from 'react';
import { RegExpMarkerOptions, UnmarkOptions } from 'mark.js';
/**
 * @public
 */
export declare type RegExpMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
    mark?: RegExp;
    options?: RegExpMarkerOptions;
    as?: string | ElementType;
    unmarkOptions?: UnmarkOptions;
} & T;
/**
 * @public
 */
export declare const RegExpMarker: <T>({ mark, options, as, unmarkOptions, ...restProps }: RegExpMarkerProps<T>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=RegExpMarker.d.ts.map