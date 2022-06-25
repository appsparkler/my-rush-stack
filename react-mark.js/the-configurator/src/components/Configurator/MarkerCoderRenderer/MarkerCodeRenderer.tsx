import { Box, BoxProps } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/themes/prism-tomorrow.css';
import { keys, noop } from 'lodash/fp';
import { RangeMarkerItem } from 'mark.js';

export type MarkerType = 'RangesMarker' | 'Marker' | 'RegExpMarker';

export type MarkerCodeRendererProps = {
  markerType?: MarkerType;
  mark?: string | RegExp | RangeMarkerItem[];
  options?: {};
  ranges?: { start: number; length: number }[];
  isRangesMarker?: boolean;
  wrapperProps?: BoxProps;
  onChange?: (updatedCode: string) => void;
  isMarkArray?: boolean;
};

export const MarkerCodeRenderer = ({
  mark = '',
  markerType = 'Marker',
  isRangesMarker = false,
  options = {},
  ranges = [],
  wrapperProps = {},
  onChange = noop,
  isMarkArray = false,
}: MarkerCodeRendererProps) => {
  const codeRef = useRef(null);
  const optionsString = useMemo(() => {
    return JSON.stringify(options, null, 4).replace('}', `  }`);
  }, [options]);
  const markRenderer = useMemo(() => {
    if (isRangesMarker) {
      const SPACES_2 = `  `;
      const rangesJSON = JSON.stringify(ranges, null, 4).replace(
        ']',
        `${SPACES_2}]`
      );
      return `mark={${rangesJSON}}`;
    }
    if (isMarkArray) {
      return `mark={${mark}}`;
    }
    return `mark="${mark}"`;
  }, [isMarkArray, isRangesMarker, mark, ranges]);
  const optionsRender = useMemo(() => {
    const showOptions = keys(options).length > 0 ? true : false;
    if (showOptions) {
      return `
  options={${optionsString}}
/>`;
    }
    return `
/>`;
  }, [options, optionsString]);
  const code = useMemo(
    () => `<${markerType}
  ${markRenderer}${optionsRender}`,
    [markRenderer, markerType, optionsRender]
  );

  useEffect(() => {
    onChange(code);

    const highlightedCode = Prism.highlight(
      code,
      (Prism.languages as any).jsx,
      'jsx'
    );
    (codeRef.current as any).innerHTML = highlightedCode;
  }, [code, mark, onChange, options]);

  return (
    <Box {...wrapperProps} sx={{ pre: { borderRadius: 4 } }}>
      <pre className="language-jsx">
        <code className="language-jsx" ref={codeRef}></code>
      </pre>
    </Box>
  );
};
