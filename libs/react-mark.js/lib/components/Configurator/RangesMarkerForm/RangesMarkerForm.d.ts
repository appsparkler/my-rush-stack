import { FC } from 'react';
import { TextFieldProps } from '@mui/material';
export declare type RangesMarkerRawConfig = {
    className: string;
    debug: boolean;
    element: string;
    exclude: TextFieldProps[];
    iframes: boolean;
    iframesTimeout: number;
};
export declare type RangesMarkerRefinedConfig = {
    className?: string;
    debug?: boolean;
    element?: string;
    exclude?: string[];
    iframes?: boolean;
    iframesTimeout?: number;
};
declare type RangeItem = {
    start: number;
    length: number;
};
export declare type OnChangeRanges = (ranges: RangeItem[]) => void;
export declare type RangesMarkerFormProps = {
    ranges?: RangeItem[];
    onChangeOptions?: (config: RangesMarkerRefinedConfig) => void;
    onChangeRanges?: OnChangeRanges;
};
export declare const RangesMarkerForm: FC<RangesMarkerFormProps>;
export {};
//# sourceMappingURL=RangesMarkerForm.d.ts.map