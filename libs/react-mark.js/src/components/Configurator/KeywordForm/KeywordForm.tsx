import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Synonyms } from './Synonyms';
import {
  Horizontal,
  InteactiveSimpleList,
  SimpleSelect,
  SimpleTextField,
  Vertical,
} from 'mui';
import { SimpleFormControlChange } from 'common-types';
import { noop } from 'lodash/fp';

export type SimpleCheckboxProps = Partial<
  Omit<FormControlLabelProps, 'onChange'>
> & {
  onChange?: SimpleFormControlChange<boolean>;
  label?: string;
};

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
export const KeywordForm = (props = {}) => {
  const [config, setConfig] = useState({
    keyword: '',
    excludes: [],
    accuracy: 'complimentary',
    element: '',
    iframesTimeout: 0,
    wildcards: '',
    className: '',
    separateWordSearch: false,
    diacritics: false,
    iframes: false,
    caseSensitive: false,
    ignoreJoiners: false,
    acrossElements: false,
    debug: false,
  });

  const handleChange = useCallback<
    SimpleFormControlChange<string | any[] | boolean>
  >((key, value) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  }, []);

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
        {
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
        }
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
        label="punctuation"
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
        <SimpleTextField
          type="text"
          label="Wildcards"
          fullWidth
          size="small"
          value={config.wildcards}
          name="wildcards"
          onChange={handleChange}
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
