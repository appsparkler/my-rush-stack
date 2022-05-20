import React, { useCallback, useState } from 'react';
import { Grid, TextFieldProps } from '@mui/material';
import {
  getDefaultInteactiveSimpleListItem,
  InteactiveSimpleList,
  SimpleTextField,
  Vertical,
} from 'mui';
import {
  DynamicKeyValueList,
  DynamicKeyValueListItem,
  DynamicKeyValueListProps,
} from '../KeywordForm/DynamicKeyValueList';
import { SimpleFormControlChange } from 'common-types';
import { uniqueId } from 'lodash/fp';

export type RangesMarkerRawConfig = {
  className: string;
  debug: boolean;
  done: () => void;
  each: () => void;
  element: string;
  exclude: TextFieldProps[];
  filter: () => void;
  iframes: boolean;
  iframesTimeout: number;
  log: Console;
  noMatch: () => void;
};

const defaultConfig = {
  className: '',
  debug: false,
  done: () => {},
  each: () => {},
  element: 'mark',
  exclude: [getDefaultInteactiveSimpleListItem()],
  filter: () => {},
  iframes: false,
  iframesTimeout: 5000,
  log: console,
  noMatch: () => {},
};

export const RangesMarkerForm = () => {
  const [config, setConfig] = useState<RangesMarkerRawConfig>(defaultConfig);
  const [ranges, setRanges] = useState<DynamicKeyValueListItem[]>([
    {
      field1: {
        label: 'start',
        size: 'small',
        type: 'number',
        value: 20,
      },
      field2: {
        label: 'length',
        size: 'small',
        type: 'number',
        value: 30,
      },
      id: uniqueId('range'),
    },
  ]);

  const handleChangeConfig = useCallback<SimpleFormControlChange<any>>(
    (name, value) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [name]: value,
      }));
    },
    []
  );

  const handleChangeRange = useCallback<DynamicKeyValueListProps['onChange']>(
    (name, value) => {
      setRanges(value);
    },
    []
  );

  return (
    <Grid container spacing={2}>
      {/* COLUMN 1 */}
      <Grid item xs={12}>
        <DynamicKeyValueList
          title="Ranges"
          name="ranges"
          value={ranges}
          onChange={handleChangeRange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <Vertical gap={2}>
          <SimpleTextField
            fullWidth
            name="element"
            label="Element"
            type="text"
            size="small"
            value={config.element}
            onChange={handleChangeConfig}
          />
          <InteactiveSimpleList
            label="exclude"
            title="Exclude"
            name="exclude"
            value={config.exclude}
            onChange={handleChangeConfig}
          />

          <SimpleTextField
            fullWidth
            name="iframesTimeout"
            label="IFrames Timeout"
            type="number"
            value={config.iframesTimeout}
            size="small"
            onChange={handleChangeConfig}
          />
        </Vertical>
      </Grid>
      <Grid item xs={6} sm={6}>
        <SimpleTextField
          fullWidth
          name="className"
          label="Class Name"
          type="text"
          size="small"
          value={config.className}
          onChange={handleChangeConfig}
        />
      </Grid>
    </Grid>
  );
};
