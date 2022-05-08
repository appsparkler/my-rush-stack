import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import React from 'react';
import { Synonyms } from './Synonyms';
import {
  Horizontal,
  InteactiveSimpleList,
  SimpleSelect,
  SimpleTextField,
  Vertical,
} from 'mui';

export const KeywordForm = (props = {}) => {
  return (
    <Vertical gap={2} {...props}>
      {/* ROW 1 */}
      <Horizontal gap={2}>
        <SimpleTextField
          label="Keyword"
          fullWidth
          size="small"
          onChange={console.log}
          name="keyword"
        />
        {
          <SimpleSelect
            label="Accurracy"
            onChange={console.log}
            value="complimentary"
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
        <TextField label="Element" fullWidth size="small" />
        <TextField label="Class name" fullWidth size="small" />
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
