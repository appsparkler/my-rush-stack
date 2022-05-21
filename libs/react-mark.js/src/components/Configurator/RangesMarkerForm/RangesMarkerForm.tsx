import React, { FC, useCallback, useEffect, useState } from 'react';
import { Grid, TextFieldProps } from '@mui/material';
import {
  getDefaultInteactiveSimpleListItem,
  InteactiveSimpleList,
  SimpleCheckbox,
  SimpleTextField,
  Vertical,
} from 'mui';
import {
  DynamicKeyValueList,
  DynamicKeyValueListItem,
  DynamicKeyValueListProps,
} from '../KeywordForm/DynamicKeyValueList';
import { SimpleFormControlChange } from 'common-types';
import { uniqueId, reduce, noop } from 'lodash/fp';

const reduceValuesToString = reduce<TextFieldProps, string[]>((acc, item) => {
  if (item.value) {
    return [...acc, String(item.value)];
  }
  return [...acc];
}, []);

const getRefinedConfig = (
  rawConfig: RangesMarkerRawConfig,
  defaultConfig: RangesMarkerRefinedConfig
): RangesMarkerRefinedConfig => {
  const excludeValue = reduceValuesToString(rawConfig.exclude);

  return {
    className:
      defaultConfig.className === rawConfig.className
        ? undefined
        : rawConfig.className,

    debug:
      defaultConfig.debug === rawConfig.debug ? undefined : rawConfig.debug,

    element:
      defaultConfig.element === rawConfig.element
        ? undefined
        : rawConfig.element,

    exclude:
      excludeValue.length === defaultConfig.exclude?.length
        ? undefined
        : excludeValue,

    iframes:
      defaultConfig.iframes === rawConfig.iframes
        ? undefined
        : rawConfig.iframes,

    iframesTimeout:
      defaultConfig.iframesTimeout === rawConfig.iframesTimeout
        ? undefined
        : rawConfig.iframesTimeout,
  };
};

export type RangesMarkerRawConfig = {
  className: string;
  debug: boolean;
  element: string;
  exclude: TextFieldProps[];
  iframes: boolean;
  iframesTimeout: number;
};

export type RangesMarkerRefinedConfig = {
  className?: string;
  debug?: boolean;
  element?: string;
  exclude?: string[];
  iframes?: boolean;
  iframesTimeout?: number;
};

const defaultConfig: RangesMarkerRefinedConfig = {
  className: '',
  debug: false,
  element: 'mark',
  exclude: [],
  iframes: false,
  iframesTimeout: 5000,
};

export type RangesMarkerFormProps = {
  onChangeOptions?: (config: RangesMarkerRefinedConfig) => void;
};

export const RangesMarkerForm: FC<RangesMarkerFormProps> = ({
  onChangeOptions = noop,
}) => {
  const [config, setConfig] = useState<RangesMarkerRawConfig>({
    ...defaultConfig,
    className: '',
    debug: false,
    element: 'mark',
    exclude: [getDefaultInteactiveSimpleListItem()],
    iframes: false,
    iframesTimeout: 5000,
  });
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

  const handleChangeRange = useCallback<
    NonNullable<DynamicKeyValueListProps['onChange']>
  >((name, value) => {
    setRanges(value);
  }, []);

  useEffect(() => {
    onChangeOptions(getRefinedConfig(config, defaultConfig));
  }, [config, onChangeOptions]);

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
        <Vertical gap={2}>
          <SimpleTextField
            fullWidth
            name="className"
            label="Class Name"
            type="text"
            size="small"
            value={config.className}
            onChange={handleChangeConfig}
          />
          <Vertical>
            <SimpleCheckbox
              label={'Iframes'}
              name="iframes"
              checked={config.iframes}
              onChange={handleChangeConfig}
            />
            <SimpleCheckbox
              label={'Debug'}
              name="debug"
              checked={config.debug}
              onChange={handleChangeConfig}
            />
          </Vertical>
        </Vertical>
      </Grid>
    </Grid>
  );
};
