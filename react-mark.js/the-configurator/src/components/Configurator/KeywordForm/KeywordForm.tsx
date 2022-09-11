import { Grid, TextFieldProps } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DynamicKeyValueListItem,
  DynamicKeyValueList,
} from './DynamicKeyValueList';
import {
  getDefaultInteactiveSimpleListItem,
  InteactiveSimpleList,
  SimpleCheckbox,
  SimpleSelect,
  SimpleTextField,
  Vertical,
} from 'mui';
import { SimpleFormControlChange } from 'common-types';
import { isArray, keys, noop, reduce, uniqueId, pickBy } from 'lodash/fp';
import { getValues } from '../../../utils';
import { MarkOptions } from 'mark.js';

const defaultConfig: MarkOptions = {
  accuracy: 'partially',
  acrossElements: false,
  caseSensitive: false,
  className: '',
  debug: false,
  diacritics: true,
  element: 'mark',
  exclude: [],
  iframes: false,
  iframesTimeout: 5000,
  ignoreJoiners: false,
  ignorePunctuation: [],
  log: console,
  separateWordSearch: true,
  synonyms: {},
  wildcards: 'disabled',
};

// types
export type KeywordFormRawConfig = Omit<
  MarkOptions,
  'exclude' | 'ignorePunctuation' | 'synonyms'
> & {
  exclude: TextFieldProps[];
  ignorePunctuation: TextFieldProps[];
  synonyms: DynamicKeyValueListItem[];
};

export type TextFieldPropsValue = TextFieldProps['value'];

// utils
const getRefinedSynonyms = (
  synonyms: DynamicKeyValueListItem[]
): Record<string, string> => {
  return reduce<DynamicKeyValueListItem, Record<string, string>>(
    (acc, item) => {
      if (Boolean(item.field1.value) && Boolean(item.field2.value)) {
        return {
          ...acc,
          [item.field1.value as string]: item.field2.value as string,
        };
      }
      return acc;
    },
    {}
  )(synonyms);
};

export const getRefinedConfig = ({
  exclude,
  element,
  className,
  accuracy,
  synonyms,
  iframesTimeout,
  wildcards,
  iframes,
  ignoreJoiners,
  acrossElements,
  caseSensitive,
  debug,
  diacritics,
  ignorePunctuation,
  separateWordSearch,
}: KeywordFormRawConfig): MarkOptions => {
  const excludesValue = getValues<TextFieldProps, unknown>(exclude);
  const punctuationsValue = getValues<TextFieldProps, unknown>(
    ignorePunctuation
  );
  const synonymsValue = getRefinedSynonyms(synonyms);
  return {
    accuracy: accuracy === defaultConfig.accuracy ? undefined : accuracy,
    acrossElements:
      defaultConfig.acrossElements === acrossElements
        ? undefined
        : acrossElements,
    caseSensitive:
      defaultConfig.caseSensitive === caseSensitive ? undefined : caseSensitive,
    className: defaultConfig.className === className ? undefined : className,
    debug: debug === defaultConfig.debug ? undefined : debug,
    diacritics:
      diacritics === defaultConfig.diacritics ? undefined : diacritics,
    element: defaultConfig.element === element ? undefined : element,
    exclude: excludesValue.length ? excludesValue : undefined,
    iframes: iframes === defaultConfig.iframes ? undefined : iframes,
    iframesTimeout:
      iframesTimeout === defaultConfig.iframesTimeout
        ? undefined
        : Number(iframesTimeout),
    ignoreJoiners:
      ignoreJoiners === defaultConfig.ignoreJoiners ? undefined : ignoreJoiners,
    ignorePunctuation: punctuationsValue.length ? punctuationsValue : undefined,
    separateWordSearch:
      separateWordSearch === defaultConfig.separateWordSearch
        ? undefined
        : separateWordSearch,
    synonyms: keys(synonymsValue).length ? synonymsValue : undefined,
    wildcards: defaultConfig.wildcards === wildcards ? undefined : wildcards,
  };
};

export type KeywordFormPropsOnChange = (
  keywordFormConfig: MarkOptions | undefined
) => void;

export type KeywordFormPropsOnChangeKeyword = (keyword: string) => void;

export type KeywordFormProps = {
  onChange?: KeywordFormPropsOnChange;
  onChangeKeyword?: KeywordFormPropsOnChangeKeyword;
  isKeywordsArray?: boolean;
  keyword?: string;
};

// JSX
export const KeywordForm = ({
  keyword = 'Lorem Ipsum',
  onChange = noop,
  onChangeKeyword = noop,
  isKeywordsArray = false,
}: KeywordFormProps) => {
  const [keywordArray, setKeywordArray] = useState<string>(
    JSON.stringify(['Lorem', 'Ipsum'])
  );

  const [config, setConfig] = useState<KeywordFormRawConfig>({
    ...defaultConfig,
    accuracy: 'partially',
    exclude: [getDefaultInteactiveSimpleListItem()],
    ignorePunctuation: [getDefaultInteactiveSimpleListItem()],
    synonyms: [
      {
        field1: {
          label: 'keyword',
          size: 'small',
          value: '',
        },
        field2: {
          label: 'synonym',
          size: 'small',
          value: '',
        },
        id: uniqueId('synonym-key'),
      },
    ],
    wildcards: 'disabled',
  });

  const handleChange = useCallback<
    SimpleFormControlChange<string | any[] | boolean>
  >(
    (key, value) => {
      if (key === 'keyword') {
        if (isKeywordsArray) {
          setKeywordArray(value as string);
          onChangeKeyword(value as string);
        } else {
          onChangeKeyword(value as string);
        }
      } else {
        setConfig((prevConfig) => ({
          ...prevConfig,
          [key]: value,
        }));
      }
    },
    [isKeywordsArray, onChangeKeyword]
  );

  const isErrorKeyword = useMemo(() => {
    if (isKeywordsArray) {
      try {
        const parsedValue = JSON.parse(keywordArray);
        if (isArray(parsedValue)) return false;
        return true;
      } catch (e) {
        return true;
      }
    }
  }, [isKeywordsArray, keywordArray]);

  useEffect(() => {
    const refinedConfig = getRefinedConfig(config);
    const pickedValues = pickBy<MarkOptions>((x) => typeof x !== 'undefined')(
      refinedConfig
    );
    onChange(pickedValues);
  }, [config, onChange]);

  return (
    <Vertical gap={2}>
      {/* ROW 1 */}
      <Grid container spacing={2}>
        {/* COLUMN 1 */}
        <Grid item xs={6}>
          <Vertical gap={2}>
            <SimpleTextField
              sx={{ flexBasis: 0 }}
              label="Keyword"
              fullWidth
              size="small"
              onChange={handleChange}
              name="keyword"
              value={keyword}
              error={isErrorKeyword}
            />
            <SimpleTextField
              label="Element"
              fullWidth
              size="small"
              value={config.element}
              name="element"
              onChange={handleChange}
            />
            <DynamicKeyValueList
              name="synonyms"
              onChange={handleChange}
              value={config.synonyms}
              title="Synonyms"
            />
            <InteactiveSimpleList
              name="exclude"
              title="Exclusions"
              label="Exclude Item"
              ariaLabelAdd="add exclusion"
              ariaLabelDelete="delete exclusion"
              value={config.exclude}
              onChange={handleChange}
            />
            <InteactiveSimpleList
              name="ignorePunctuation"
              title="Ignore Punctuation"
              label="for ex: ."
              ariaLabelAdd="add punctuation to ignore"
              ariaLabelDelete="delete punctuation to ignore"
              value={config.ignorePunctuation}
              onChange={handleChange}
            />
            <SimpleTextField
              type="number"
              label="IFrames Timeout"
              fullWidth
              size="small"
              name="iframesTimeout"
              value={config.iframesTimeout}
              onChange={handleChange}
            />
            <SimpleSelect
              label="Wild Cards"
              onChange={handleChange}
              value={config.wildcards}
              name="wildCards"
              menuItems={[
                { id: '1', name: 'disabled', value: 'disabled' },
                { id: '2', name: 'enabled', value: 'enabled' },
                { id: '3', name: 'withSpaces', value: 'withSpaces' },
              ]}
            />
          </Vertical>
        </Grid>

        {/* COLUMN 2 */}
        <Grid item xs={6}>
          <Vertical gap={2}>
            <SimpleSelect
              label="Accurracy"
              onChange={handleChange}
              value={config.accuracy}
              name="accuracy"
              menuItems={[
                { id: '1', name: 'partially', value: 'partially' },
                { id: '2', name: 'exactly', value: 'exactly' },
                { id: '3', name: 'complimentary', value: 'complimentary' },
              ]}
            />
            <SimpleTextField
              label="Class name"
              fullWidth
              size="small"
              onChange={handleChange}
              name="className"
              value={config.className}
            />
            <Vertical>
              <SimpleCheckbox
                label="Separate World Search"
                checked={config.separateWordSearch}
                name="separateWordSearch"
                onChange={handleChange}
              />
              <SimpleCheckbox
                label="Diacritics"
                name="diacritics"
                checked={config.diacritics}
                onChange={handleChange}
              />
              <SimpleCheckbox
                label="IFrames"
                name="iframes"
                onChange={handleChange}
                checked={config.iframes}
              />
              <SimpleCheckbox
                label="Case Sensitive"
                name="caseSensitive"
                onChange={handleChange}
                checked={config.caseSensitive}
              />
              <SimpleCheckbox
                label="Ignore Joiners"
                name="ignoreJoiners"
                onChange={handleChange}
                checked={config.ignoreJoiners}
              />
              <SimpleCheckbox
                label="Across Elements"
                name="acrossElements"
                onChange={handleChange}
                checked={config.acrossElements}
              />
              <SimpleCheckbox
                label="Debug"
                name="debug"
                onChange={handleChange}
                checked={config.debug}
              />
            </Vertical>
          </Vertical>
        </Grid>
      </Grid>
    </Vertical>
  );
};
