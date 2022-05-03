import { Box } from '@mui/material';
import React from 'react';
import { useMemo } from 'react';

export default {
  title: 'Web/Configurator/Marker Code Renderer',
};

const Template = () => {
  const mark = 'hello world';
  const options = { foo: 'foo', ignore: ['h1', '.hello'] };
  const optionsString = JSON.stringify(options, null, 4).replace('}', `  }`);
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
    <Box bgcolor={'grey.200'} p={1}>
      <pre>{`${firstLine}
  mark="${mark}"${optionsRender}`}</pre>
    </Box>
  );
};

export const markerCodeRenderer = Template.bind({});
