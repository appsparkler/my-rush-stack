import { Grid, TextFieldProps } from '@mui/material';
import { useCallback, useState } from 'react';
import {
  getDefaultInteactiveSimpleListItem,
  InteactiveSimpleList,
  SimpleCheckbox,
  SimpleTextField,
  SimpleTextFieldProps,
  Vertical,
} from 'mui';

export type RegExpFormConfig = Partial<{
  element: string;
  className: string;
  exclude: string[];
  iframes: boolean;
  iframesTimeout: number;
  acrossElements: boolean;
  ignoreGroups: number;
  each: () => void;
  filter: () => void;
  noMatch: () => void;
  done: () => void;
  debug: boolean;
  log: Console;
}>;

const defaultConfig = {
  acrossElements: false,
  className: '',
  debug: false,
  done: () => {},
  each: () => {},
  element: 'mark',
  exclude: [],
  filter: () => {},
  iframes: false,
  iframesTimeout: 5000,
  ignoreGroups: 0,
  log: console,
  noMatch: () => {},
};

export const RegExpForm = () => {
  const [regexp, setRegexp] = useState<string>('/Lorem Ipsum/');
  const [options, setOptions] = useState<{
    element: string;
    ignoreGroups: number;
    className: string;
    iframesTimeout: number;
    acrossElements: boolean;
    iframes: boolean;
    debug: boolean;
    exclude: TextFieldProps[];
  }>({
    acrossElements: false,
    className: '',
    debug: false,
    element: 'mark',
    exclude: [getDefaultInteactiveSimpleListItem()],
    iframes: false,
    iframesTimeout: 5000,
    ignoreGroups: 0,
  });

  const handleChange = useCallback((key: string, value: any) => {
    switch (key) {
      case 'regexp':
        setRegexp(value);
        break;
      default:
        setOptions((prevState) => ({
          ...prevState,
          [key]: value,
        }));
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={6}>
        <Vertical gap={2}>
          <SimpleTextField
            fullWidth
            label="RegExp"
            name="regexp"
            value={regexp}
            size="small"
            onChange={handleChange}
          />
          <SimpleTextField
            fullWidth
            label="Element"
            name="element"
            value={options.element}
            size="small"
            onChange={handleChange}
          />
          <InteactiveSimpleList
            title="Exclude"
            label="exclude"
            value={options.exclude}
            name="exclude"
            onChange={handleChange}
          />
          <SimpleTextField
            fullWidth
            label="IFrames Timeout"
            name="iframesTimeout"
            value={options.iframesTimeout}
            size="small"
            onChange={handleChange}
          />
        </Vertical>
      </Grid>
      <Grid item sm={6}>
        <Vertical gap={2}>
          <SimpleTextField
            fullWidth
            label="Class Name"
            name="className"
            value={options.className}
            size="small"
            onChange={handleChange}
          />
          <SimpleTextField
            fullWidth
            type="number"
            label="Ignore Groups"
            name="ignoreGroups"
            value={options.ignoreGroups}
            size="small"
            onChange={handleChange}
          />
          <Vertical>
            <SimpleCheckbox
              label="Across Elements"
              value={options.acrossElements}
              onChange={handleChange}
            />
            <SimpleCheckbox
              label="iframes"
              value={options.iframes}
              onChange={handleChange}
            />
            <SimpleCheckbox
              label="Debug"
              value={options.debug}
              onChange={handleChange}
            />
          </Vertical>
        </Vertical>
      </Grid>
    </Grid>
  );
};
