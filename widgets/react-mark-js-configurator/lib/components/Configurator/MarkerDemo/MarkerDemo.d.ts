/// <reference types="react" />
import { MarkOptions, RangeMarkerItem, RangesMarkerOptions, RegExpMarkerOptions } from 'mark.js';
import { MarkerType } from '../MarkerCoderRenderer';
export declare type MarkerDemoProps = {
    mark?: string | RegExp | RangeMarkerItem[];
    options?: RegExpMarkerOptions | RangesMarkerOptions | MarkOptions;
    markerType?: MarkerType;
};
export declare const MarkerDemo: ({ mark, options, markerType, }: MarkerDemoProps) => JSX.Element;
//# sourceMappingURL=MarkerDemo.d.ts.map