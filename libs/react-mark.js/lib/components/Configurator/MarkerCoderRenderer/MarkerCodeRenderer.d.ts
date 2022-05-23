/// <reference types="react" />
import { BoxProps } from '@mui/material';
import './prism.css';
export declare type MarkerType = 'RangesMarker' | 'Marker' | 'RegExpMarker';
export declare type MarkerCodeRendererProps = {
    markerType?: MarkerType;
    mark?: string | RegExp;
    options?: {};
    ranges?: {
        start: number;
        length: number;
    }[];
    isRangesMarker?: boolean;
    wrapperProps?: BoxProps;
    onChange?: (updatedCode: string) => void;
    isMarkArray?: boolean;
};
export declare const MarkerCodeRenderer: ({ mark, markerType, isRangesMarker, options, ranges, wrapperProps, onChange, isMarkArray, }: MarkerCodeRendererProps) => JSX.Element;
//# sourceMappingURL=MarkerCodeRenderer.d.ts.map