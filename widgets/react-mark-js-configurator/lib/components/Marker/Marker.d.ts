import React, { ElementType, HTMLAttributes } from 'react';
import { MarkOptions } from 'mark.js';
export declare type MarkerProps<T = HTMLAttributes<HTMLDivElement>> = {
    children?: React.ReactNode;
    as?: string | ElementType;
    mark?: string | string[];
    options?: MarkOptions;
} & T;
export declare const Marker: <T extends {} = React.HTMLAttributes<HTMLDivElement>>({ as, mark, options, ...restProps }: MarkerProps<T>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=Marker.d.ts.map