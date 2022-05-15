import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  TextFieldProps,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { getDefaultSynonymItem, SynonymItem, Synonyms } from './Synonyms';
import {
  getDefaultInteactiveSimpleListItem,
  Horizontal,
  InteactiveSimpleList,
  SimpleSelect,
  SimpleTextField,
  Vertical,
} from 'mui';
import { SimpleFormControlChange } from 'common-types';
import { filter, keys, map, noop, pipe, reduce } from 'lodash/fp';

export type SimpleCheckboxProps = Partial<
  Omit<FormControlLabelProps, 'onChange'>
> & {
  onChange?: SimpleFormControlChange<boolean>;
  label?: string;
};

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

//
const SimpleCheckbox = ({
  checked,
  name = '',
  label = '',
  onChange = noop,
}: SimpleCheckboxProps) => {
  const handleChange = useCallback<
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
  >(
    ({ target: { checked, name } }) => {
      onChange(name, checked);
    },
    [onChange]
  );
  return (
    <FormControlLabel
      name={name}
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={label}
    />
  );
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
  // keyword,
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
  onChange: (keywordFormConfig: MarkConfig) => void;
  onChangeKeyword: (keyword: string) => void;
};

// JSX
export const KeywordForm = ({
  onChange,
  onChangeKeyword,
}: KeywordFormProps) => {
  const [keyword, setKeyword] = useState<string>('Lorem Ipsum');
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
        setKeyword(value as string);
        onChangeKeyword(value as string);
      } else {
        setConfig((prevConfig) => ({
          ...prevConfig,
          [key]: value,
        }));
      }
    },
    [onChangeKeyword]
  );

  useEffect(() => {
    onChange(getRefinedConfig(config));
  }, [config, onChange]);

  return (
    <Vertical gap={2}>
      {/* ROW 1 */}
      <Horizontal gap={2}>
        <SimpleTextField
          label="Keyword"
          fullWidth
          size="small"
          onChange={handleChange}
          name="keyword"
          value={keyword}
        />
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
      </Horizontal>
      {/** ROW 2 */}
      <Horizontal gap={2}>
        <SimpleTextField
          label="Element"
          fullWidth
          size="small"
          value={config.element}
          name="element"
          onChange={handleChange}
        />
        <SimpleTextField
          label="Class name"
          fullWidth
          size="small"
          onChange={handleChange}
          name="className"
          value={config.className}
        />
      </Horizontal>

      {/* ROW 3 */}
      <Synonyms name="synonyms" onChange={handleChange} />

      {/* ROW 4 */}
      <InteactiveSimpleList
        name="exclude"
        title="Exclusions"
        label="Exclude Item"
        ariaLabelAdd="add exclusion"
        ariaLabelDelete="delete exclusion"
        value={config.exclude}
        onChange={handleChange}
      />

      {/* ROW 5 */}
      <InteactiveSimpleList
        name="ignorePunctuation"
        title="Ignore Punctuation"
        label="for ex: ."
        ariaLabelAdd="add punctuation to ignore"
        ariaLabelDelete="delete punctuation to ignore"
        value={config.ignorePunctuation}
        onChange={handleChange}
      />

      {/* ROW 6 */}
      <Horizontal gap={2}>
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
      </Horizontal>

      {/* ROW 7 */}
      <FormGroup>
        <Box
          display="grid"
          gridTemplateColumns={[
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
          ]}
        >
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
        </Box>
      </FormGroup>
    </Vertical>
  );
};
