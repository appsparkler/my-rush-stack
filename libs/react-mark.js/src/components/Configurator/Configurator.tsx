import { Box, createTheme, ThemeProvider } from '@mui/material';
import React, { useMemo } from 'react';

// export const Configurator = () => {

//     return
// }

export const Configurator = () => {
  const theme = createTheme({ palette: { mode: 'light' } });
  console.log({ theme });
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
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor={'grey.200'} p={2}>
        <pre>{`
<Marker 
  mark="${mark}"${optionsRender}`}</pre>
        <pre>{JSON.stringify(theme, null, 2)}</pre>
      </Box>
    </ThemeProvider>
  );
};
