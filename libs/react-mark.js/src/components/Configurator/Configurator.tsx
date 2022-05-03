import { Box, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

// export const Configurator = () => {

//     return
// }

export const Configurator = () => {
  const theme = createTheme({ palette: { mode: 'light' } });
  console.log({ theme });
  const mark = 'hello world';
  const options = JSON.stringify(
    { foo: 'Foo', bar: 'Bar', baz: 'Baz' },
    null,
    6
  ).replace('}', `    }`);
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor={'grey.200'} p={2}>
        <pre>{`
<Marker 
    mark="${mark}"
    options={${options}}
/>
              
              `}</pre>
        <pre>{JSON.stringify(theme, null, 2)}</pre>
      </Box>
    </ThemeProvider>
  );
};
