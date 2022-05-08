/// <reference types="react" />
import { BoxProps } from '@mui/material';
import './prism.css';
export declare type MarkerCodeRendererProps = {
    mark?: string;
    options?: {};
    wrapperProps?: BoxProps;
    onChange: (updatedCode: string) => void;
};
export declare const MarkerCodeRenderer: ({ mark, options, wrapperProps, onChange, }: MarkerCodeRendererProps) => JSX.Element;
//# sourceMappingURL=MarkerCodeRenderer.d.ts.map