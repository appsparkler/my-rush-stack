import { Box, BoxProps } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import Prism from './prism.js';
import './prism.css';
import { keys, noop } from 'lodash/fp';
import { filterOutFalsy } from '../KeywordForm';

export type MarkerCodeRendererProps = {
  mark?: string;
  options?: {};
  wrapperProps?: BoxProps;
  onChange?: (updatedCode: string) => void;
  isMarkArray?: boolean;
};

export const MarkerCodeRenderer = ({
  mark = '',
  options = {},
  wrapperProps = {},
  onChange = noop,
  isMarkArray = false,
}: MarkerCodeRendererProps) => {
  const codeRef = useRef(null);
  const optionsString = useMemo(() => {
    return JSON.stringify(options, null, 4).replace('}', `  }`);
  }, [options]);
  const markRenderer = useMemo(() => {
    if (isMarkArray) {
      return `mark={${mark}}`;
    }
    return `mark="${mark}"`;
  }, [isMarkArray, mark]);
  const optionsRender = useMemo(() => {
    const refinedOptions = filterOutFalsy(options);
    const showOptions = keys(refinedOptions).length > 0 ? true : false;
    if (showOptions) {
      return `
  options={${optionsString}}
/>`;
    }
    return `
/>`;
  }, [options, optionsString]);
  const code = useMemo(
    () => `<Marker
  ${markRenderer}${optionsRender}`,
    [markRenderer, optionsRender]
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
