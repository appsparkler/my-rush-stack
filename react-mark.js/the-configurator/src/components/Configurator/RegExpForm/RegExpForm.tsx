import { Grid, TextFieldProps } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getValues, someAreTruthy, stringToRegex } from '../../../utils';
import {
  getDefaultInteactiveSimpleListItem,
  InteactiveSimpleList,
  SimpleCheckbox,
  SimpleTextField,
  Vertical,
} from 'mui';
import { noop, values } from 'lodash/fp';
import React from 'react';
import { RegExpMarkerOptions } from 'mark.js';

export type RegExpFormRawValues = {
  element: string;
  ignoreGroups: number;
  className: string;
  iframesTimeout: number;
  acrossElements: boolean;
  iframes: boolean;
  debug: boolean;
  exclude: TextFieldProps[];
};

const defaultConfig: RegExpMarkerOptions = {
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

const getRefinedOptions = (
  options: RegExpFormRawValues
): RegExpMarkerOptions => {
  const {
    acrossElements,
    className,
    debug,
    element,
    exclude,
    iframes,
    iframesTimeout,
    ignoreGroups,
  } = options;
  const excludeValue = getValues<TextFieldProps, unknown>(exclude);
  return {
    acrossElements:
      acrossElements === defaultConfig.acrossElements
        ? undefined
        : acrossElements,
    className: className === defaultConfig.className ? undefined : className,
    debug: debug === defaultConfig.debug ? undefined : debug,
    done: undefined,
    each: undefined,
    element: element === defaultConfig.element ? undefined : element,
    exclude: excludeValue.length > 0 ? excludeValue : undefined,
    filter: undefined,
    iframes: iframes === defaultConfig.iframes ? undefined : iframes,
    iframesTimeout:
      iframesTimeout === defaultConfig.iframesTimeout
        ? undefined
        : Number(iframesTimeout),
    ignoreGroups:
      defaultConfig.ignoreGroups === ignoreGroups
        ? undefined
        : Number(ignoreGroups),
    log: undefined,
    noMatch: undefined,
  };
};

export type RegExpChangeHandler = (regExpValue: RegExp) => void;

export type RegExpFormProps = {
  onChangeRegExp?: RegExpChangeHandler;
  onChangeOptions?: (regExpConfig: RegExpMarkerOptions | undefined) => void;
};

export const RegExpForm = ({
  onChangeOptions = noop,
  onChangeRegExp = noop,
}: RegExpFormProps) => {
  const [regexp, setRegexp] = useState<string>('/Lorem/');

  const [options, setOptions] = useState<RegExpFormRawValues>({
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

  useEffect(() => {
    onChangeRegExp(stringToRegex(regexp));
  }, [onChangeRegExp, regexp]);

  useEffect(() => {
    const refinedOptions = getRefinedOptions(options);
    const refinedOptionValues = values(refinedOptions);
    const someHaveDefinedValues = someAreTruthy(refinedOptionValues);

    onChangeOptions(someHaveDefinedValues ? refinedOptions : undefined);
  }, [onChangeOptions, options]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
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
            type="number"
            label="IFrames Timeout"
            name="iframesTimeout"
            value={options.iframesTimeout}
            size="small"
            onChange={handleChange}
          />
        </Vertical>
      </Grid>
      <Grid item xs={6}>
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
              name="acrossElements"
              value={options.acrossElements}
              onChange={handleChange}
            />
            <SimpleCheckbox
              label="IFrames"
              name="iframes"
              value={options.iframes}
              onChange={handleChange}
            />
            <SimpleCheckbox
              label="Debug"
              name="debug"
              value={options.debug}
              onChange={handleChange}
            />
          </Vertical>
        </Vertical>
      </Grid>
    </Grid>
  );
};
