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
  const firstLine = `<Marker`;
  const finalText = useMemo(
    () => `${firstLine}
  mark="${mark}"${optionsRender}`,
    [firstLine, mark, optionsRender]
  );

  useEffect(() => {
    onChange(finalText);
  }, [mark, options]);

  return (
    <Box bgcolor={'grey.200'} p={1} {...wrapperProps}>
      <pre>{finalText}</pre>
    </Box>
  );
};
