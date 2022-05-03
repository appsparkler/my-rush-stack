import { Box, BoxProps } from '@mui/material';
import React, { useMemo } from 'react';

export type MarkerCodeRendererProps = {
  mark: string;
  options: {};
  wrapperProps: BoxProps;
};

export const MarkerCodeRenderer = ({
  mark = 'hello world',
  options = { foo: 'foo', ignore: ['h1', '.hello'] },
  wrapperProps = {},
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
  return (
    <Box bgcolor={'grey.200'} p={1} {...wrapperProps}>
      <pre>{`${firstLine}
  mark="${mark}"${optionsRender}`}</pre>
    </Box>
  );
};
