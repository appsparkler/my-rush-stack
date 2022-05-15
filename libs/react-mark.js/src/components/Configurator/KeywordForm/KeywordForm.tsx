import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  Grid,
  TextFieldProps,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getDefaultSynonymItem, SynonymItem, Synonyms } from './Synonyms';
import {
  getDefaultInteactiveSimpleListItem,
  Horizontal,
  InteactiveSimpleList,
  SimpleCheckbox,
  SimpleSelect,
  SimpleTextField,
  Vertical,
} from 'mui';
import { SimpleFormControlChange } from 'common-types';
import { filter, isArray, keys, map, noop, pipe, reduce } from 'lodash/fp';

type WildCards = 'disabled' | 'enabled' | 'withSpaces';

type Accuracy = 'partially' | 'complimentary' | 'exactly';

export type MarkConfig = Partial<{
  accuracy: Accuracy;
  acrossElements: boolean;
  caseSensitive: boolean;
  className: string;
  debug: boolean;
  diacritics: boolean;
  done: () => void;
  each: (_markedDomElement: Element) => void;
  element: string;
  exclude: string[];
  filter: (textNode: Element, term: string, numberOfMarks: number) => void;
  iframes: boolean;
  iframesTimeout: number;
  ignoreJoiners: boolean;
  ignorePunctuation: string[];
  log: Console;
  noMatch: () => void;
  separateWordSearch: boolean;
  synonyms: Record<string, string>;
  wildcards: WildCards;
}>;

const defaultConfig = {
  accuracy: 'partially',
  acrossElements: false,
  caseSensitive: false,
  className: '',
  debug: false,
  diacritics: true,
  done: () => {},
  each: (_markedDomElement: Element) => {},
  element: 'mark',
  exclude: [],
  filter: (textNode: Element, term: string, numberOfMarks: number) => {},
  iframes: false,
  iframesTimeout: 5000,
  ignoreJoiners: false,
  ignorePunctuation: [],
  log: console,
  noMatch: () => {}, // called when there are no matches
  separateWordSearch: true,
  synonyms: {},
  wildcards: 'disabled',
};

// types
export type KeywordFormRawConfig = Omit<
  MarkConfig,
  'exclude' | 'ignorePunctuation' | 'synonyms'
> & {
  exclude: TextFieldProps[];
  ignorePunctuation: TextFieldProps[];
  synonyms: SynonymItem[];
};

export type TextFieldPropsValue = TextFieldProps['value'];

// utils
export const mapExcludesToValue = <T extends { value?: unknown }>(
  values: T[]
) =>
  map<{ value?: unknown }, string | undefined>(({ value }) =>
    Boolean(value) && typeof value === 'string' ? String(value) : undefined
  )(values);

export const filterOutFalsy = filter<string>((item) => Boolean(item));

const getExcludes = <T extends { value?: ValueType }, ValueType = string>(
  values: T[]
) =>
  pipe<[{ value?: ValueType }[]], (string | undefined)[], string[]>(
    mapExcludesToValue,
    filterOutFalsy
  )(values);

const getRefinedSynonyms = (
  synonyms: SynonymItem[]
): Record<string, string> => {
  return reduce<SynonymItem, Record<string, string>>((acc, { key, value }) => {
    if (Boolean(key) && Boolean(value)) {
      return {
        ...acc,
        [key]: value,
      };
    }
    return acc;
  }, {})(synonyms);
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
}: KeywordFormRawConfig): MarkConfig => {
  const excludesValue = getExcludes<TextFieldProps, unknown>(exclude);
  const punctuationsValue = getExcludes<TextFieldProps, unknown>(
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

export type KeywordFormProps = {
  onChange?: (keywordFormConfig: MarkConfig) => void;
  onChangeKeyword?: (keyword: string) => void;
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
  // const [keyword, setKeyword] = useState<string>('Lorem Ipsum');
  const [keywordArray, setKeywordArray] = useState<string>(
    JSON.stringify(['Lorem', 'Ipsum'])
  );

  const [config, setConfig] = useState<KeywordFormRawConfig>({
    ...defaultConfig,
    accuracy: 'partially',
    exclude: [getDefaultInteactiveSimpleListItem()],
    ignorePunctuation: [getDefaultInteactiveSimpleListItem()],
    synonyms: [getDefaultSynonymItem()],
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

  useEffect(() => {
    onChange(getRefinedConfig(config));
  }, [config, onChange]);

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

  return (
    <Vertical gap={2}>
      {/* ROW 1 */}
      <Grid container spacing={2}>
        {/* COLUMN 1 */}
        <Grid item xs={6} md={6}>
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
            <Synonyms name="synonyms" onChange={handleChange} />
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
        <Grid item xs={6} md={8}>
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
            <Vertical gap={1}>
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

      {/** ROW 2 */}
      <Horizontal gap={2}></Horizontal>

      {/* ROW 3 */}

      {/* ROW 4 */}

      {/* ROW 5 */}

      {/* ROW 6 */}
      <Horizontal gap={2}></Horizontal>

      {/* ROW 7 */}
      <FormGroup>
        <Box
          display="grid"
          gridTemplateColumns={[
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
          ]}
        ></Box>
      </FormGroup>
    </Vertical>
  );
};
