import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Synonyms } from './Synonyms';
import {
  Horizontal,
  InteactiveSimpleList,
  SimpleSelect,
  SimpleTextField,
  SimpleTextFieldProps,
  Vertical,
} from 'mui';

export const KeywordForm = (props = {}) => {
  const [config, setConfig] = useState({
    keyword: '',
    accuracy: 'complimentary',
    element: '',
    className: '',
  });

  const handleChange = useCallback<SimpleTextFieldProps['onChange']>(
    (key, value) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [key]: value,
      }));
    },
    []
  );

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
      <Synonyms name="synonyms" />

      {/* ROW 4 */}
      <InteactiveSimpleList
        name="excludes"
        title="Exclusions"
        label="Exclude Item"
        ariaLabelAdd="add exclusion"
        ariaLabelDelete="delete exclusion"
      />

      {/* ROW 5 */}
      <InteactiveSimpleList
        name="ignorePunctuation"
        title="Ignore Punctuations"
        label="punctuation"
        ariaLabelAdd="add punctuation to ignore"
        ariaLabelDelete="delete punctuation to ignore"
      />

      {/* ROW 6 */}
      <Horizontal gap={2}>
        <TextField
          type="number"
          label="IFrames Timeout"
          fullWidth
          size="small"
        />
        <TextField type="text" label="Wildcards" fullWidth size="small" />
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
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Separate Word Search"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Diacritics"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="IFrames"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Case Sensitive"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Ignore Joiners"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Across Elements"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Debug"
          />
        </Box>
      </FormGroup>
    </Vertical>
  );
};
