import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

const theme = createTheme({ palette: { mode: 'light' } })

export const decorators = [
  (Story) => <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story /></ThemeProvider>
]