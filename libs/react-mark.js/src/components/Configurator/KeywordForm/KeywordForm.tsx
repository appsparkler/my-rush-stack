import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  TextFieldProps,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Synonyms } from './Synonyms';
import {
  Horizontal,
  InteactiveSimpleList,
  SimpleSelect,
  SimpleTextField,
  Vertical,
} from 'mui';
import { SimpleFormControlChange } from 'common-types';
import {
  filter,
  isArray,
  isBoolean,
  isString,
  map,
  noop,
  pipe,
} from 'lodash/fp';

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
  keyword: string;
  excludes: TextFieldProps[];
  accuracy: string;
  element: string;
  iframesTimeout: string;
  className: string;
  separateWordSearch: boolean;
  diacritics: boolean;
  iframes: boolean;
  caseSensitive: boolean;
  ignoreJoiners: boolean;
  acrossElements: boolean;
  debug: boolean;
  wildCards: string;
  ignorePunctuation: TextFieldProps[];
};

export type KeywordFormRefinedConfig = {
  keyword: string;
  excludes?: string[];
  accuracy?: string;
  element?: string;
  iframesTimeout?: string;
  className?: string;
  separateWordSearch?: boolean;
  diacritics?: boolean;
  iframes?: boolean;
  caseSensitive?: boolean;
  ignoreJoiners?: boolean;
  acrossElements?: boolean;
  debug?: boolean;
  wildCards?: string;
  ignorePunctuation?: string[];
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

const getExcludes = <T extends { value?: unknown }>(values: T[]) =>
  pipe<[{ value?: unknown }[]], (string | undefined)[], string[]>(
    mapExcludesToValue,
    filterOutFalsy
  )(values);

export const getRefinedConfig = ({
  keyword,
  excludes,
  ignorePunctuation: punctuations,
}: KeywordFormRawConfig): KeywordFormRefinedConfig => {
  const excludesValue = getExcludes<TextFieldProps>(excludes);
  const punctuationsValue = getExcludes<TextFieldProps>(punctuations);
  return {
    keyword: keyword || '',
    excludes: excludesValue.length ? excludesValue : undefined,
    ignorePunctuation: punctuationsValue.length ? punctuationsValue : undefined,
  };
};

// JSX
export const KeywordForm = (props = {}) => {
  const [config, setConfig] = useState<KeywordFormRawConfig>({
    keyword: '',
    excludes: [],
    accuracy: 'complimentary',
    element: '',
    iframesTimeout: '0',
    className: '',
    separateWordSearch: false,
    diacritics: false,
    iframes: false,
    caseSensitive: false,
    ignoreJoiners: false,
    acrossElements: false,
    debug: false,
    wildCards: 'disabled',
    ignorePunctuation: [],
  });

  const handleChange = useCallback<
    SimpleFormControlChange<string | any[] | boolean>
  >((key, value) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  }, []);

  // useEffect(() => {
  //   console.log(getRefinedConfig(config));
  // }, [config]);

  return (
    <Vertical gap={2} {...props}>
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
        onChange={handleChange}
      />

      {/* ROW 5 */}
      <InteactiveSimpleList
        name="ignorePunctuation"
        title="Ignore Punctuations"
        label="for ex: ."
        ariaLabelAdd="add punctuation to ignore"
        ariaLabelDelete="delete punctuation to ignore"
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
