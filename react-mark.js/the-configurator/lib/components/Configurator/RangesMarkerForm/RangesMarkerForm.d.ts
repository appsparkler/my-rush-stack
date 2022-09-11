import { FC } from 'react';
import { TextFieldProps } from '@mui/material';
import { RangesMarkerOptions } from 'mark.js';
export declare type RangesMarkerRawConfig = {
    className: string;
    debug: boolean;
    element: string;
    exclude: TextFieldProps[];
    iframes: boolean;
    iframesTimeout: number;
};
declare type RangeItem = {
    start: number;
    length: number;
};
export declare type OnChangeRanges = (ranges: RangeItem[]) => void;
export declare type RangesMarkerFormProps = {
    ranges?: RangeItem[];
    onChangeOptions?: (config: RangesMarkerOptions | undefined) => void;
    onChangeRanges?: OnChangeRanges;
};
export declare const RangesMarkerForm: FC<RangesMarkerFormProps>;
export {};
//# sourceMappingURL=RangesMarkerForm.d.ts.map