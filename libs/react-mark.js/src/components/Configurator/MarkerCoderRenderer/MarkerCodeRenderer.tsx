import { Box, BoxProps } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

export type MarkerCodeRendererProps = {
  mark?: string;
  options?: {};
  wrapperProps?: BoxProps;
  onChange: (updatedCode: string) => void;
};

export const MarkerCodeRenderer = ({
  mark = '',
  options = {},
  wrapperProps = {},
  onChange,
}: MarkerCodeRendererProps) => {
  const optionsString = useMemo(
    () => JSON.stringify(options, null, 4).replace('}', `  }`),
    []
  );
  const optionsRender = useMemo(() => {
    const showOptions = Object.keys(options).length > 0 ? true : false;
    if (showOptions) {
      return `
  options={${optionsString}}
/>`;
    }
    return `
/>`;
  }, []);
  const code = useMemo(
    () => `<Marker
  mark="${mark}"${optionsRender}`,
    [mark, optionsRender]
  );

  useEffect(() => {
    onChange(code);
  }, [mark, options]);

  return (
    <Box bgcolor={'grey.200'} p={1} {...wrapperProps}>
      <pre>
        <code>{code}</code>
      </pre>
    </Box>
  );
};
