import React, { ElementType, HTMLAttributes } from 'react';
import { RegExpMarkerOptions } from 'mark.js';
/**
 * @public
 */
export declare type RegExpMarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
    mark?: RegExp;
    options?: RegExpMarkerOptions;
    as?: string | ElementType;
    children: React.ReactNode;
} & T;
/**
 * @public
 */
export declare const RegExpMarker: <T>({ mark, options, as, ...restProps }: RegExpMarkerProps<T>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=RegExpMarker.d.ts.map