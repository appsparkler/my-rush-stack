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
export type KeywordFormRawConfig = {
  accuracy: string;
  acrossElements: boolean;
  caseSensitive: boolean;
  className: string;
  debug: boolean;
  diacritics: boolean;
  element: string;
  excludes: TextFieldProps[];
  iframes: boolean;
  iframesTimeout: string;
  ignoreJoiners: boolean;
  ignorePunctuation: TextFieldProps[];
  keyword: string;
  separateWordSearch: boolean;
  synonyms: SynonymItem[];
  wildCards: string;
};

export type KeywordFormRefinedConfig = {
  accuracy?: string;
  acrossElements?: boolean;
  caseSensitive?: boolean;
  className?: string;
  debug?: boolean;
  diacritics?: boolean;
  element?: string;
  excludes?: string[];
  iframes?: boolean;
  iframesTimeout?: string;
  ignoreJoiners?: boolean;
  ignorePunctuation?: string[];
  keyword: string;
  separateWordSearch?: boolean;
  synonyms?: Record<string, string>;
  wildCards?: string;
};

export type TextFieldPropsValue = TextFieldProps['value'];

// utils
export const mapExcludesToValue = <T extends { value?: unknown }>(
  values: T[]
) =>
  map<{ value?: unknown }, string>(({ value }) =>
    Boolean(value) && typeof value === 'string' ? value : undefined
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

const getRefinedBoolean = (value: boolean) => (value ? undefined : false);

export const getRefinedConfig = ({
  keyword,
  excludes,
  element,
  className,
  accuracy,
  synonyms,
  iframesTimeout,
  wildCards,
  iframes,
  ignoreJoiners,
  acrossElements,
  caseSensitive,
  debug,
  diacritics,
  ignorePunctuation: punctuations,
  separateWordSearch,
}: KeywordFormRawConfig): KeywordFormRefinedConfig => {
  const excludesValue = getExcludes<TextFieldProps, unknown>(excludes);
  const punctuationsValue = getExcludes<TextFieldProps, unknown>(punctuations);
  const synonymsValue = getRefinedSynonyms(synonyms);
  return {
    accuracy,
    acrossElements: getRefinedBoolean(acrossElements),
    caseSensitive: getRefinedBoolean(caseSensitive),
    className: className || undefined,
    debug: getRefinedBoolean(debug),
    diacritics: getRefinedBoolean(diacritics),
    element: element || undefined,
    excludes: excludesValue.length ? excludesValue : undefined,
    iframes: getRefinedBoolean(iframes),
    iframesTimeout: Number(iframesTimeout) > 0 ? iframesTimeout : undefined,
    ignoreJoiners: getRefinedBoolean(ignoreJoiners),
    ignorePunctuation: punctuationsValue.length ? punctuationsValue : undefined,
    keyword: keyword || '',
    separateWordSearch: getRefinedBoolean(separateWordSearch),
    synonyms: keys(synonymsValue).length ? synonymsValue : undefined,
    wildCards,
  };
};

export type KeywordFormProps = {
  onChange: (keywordFormConfig: KeywordFormRefinedConfig) => void;
};

// JSX
export const KeywordForm = ({ onChange }: KeywordFormProps) => {
  const [config, setConfig] = useState<KeywordFormRawConfig>({
    accuracy: 'complimentary',
    acrossElements: false,
    caseSensitive: false,
    className: '',
    debug: false,
    diacritics: false,
    element: '',
    excludes: [getDefaultInteactiveSimpleListItem()],
    iframes: false,
    iframesTimeout: '0',
    ignoreJoiners: false,
    ignorePunctuation: [getDefaultInteactiveSimpleListItem()],
    keyword: '',
    separateWordSearch: false,
    synonyms: [getDefaultSynonymItem()],
    wildCards: 'disabled',
  });

  const handleChange = useCallback<
    SimpleFormControlChange<string | any[] | boolean>
  >((key, value) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  }, []);

  useEffect(() => {
    onChange(getRefinedConfig(config));
  }, [config, onChange]);

  return (
    <Vertical gap={2}>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      {/* ROW 1 */}
      <Horizontal gap={2}>
        <SimpleTextField
          label="Keyword"
          fullWidth
          size="small"
          onChange={handleChange}
          name="keyword"
          value={config.keyword}
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
        name="excludes"
        title="Exclusions"
        label="Exclude Item"
        ariaLabelAdd="add exclusion"
        ariaLabelDelete="delete exclusion"
        value={config.excludes}
        onChange={handleChange}
      />

      {/* ROW 5 */}
      <InteactiveSimpleList
        name="ignorePunctuation"
        title="Ignore Punctuations"
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
          value={config.wildCards}
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
