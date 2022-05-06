import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { Synonyms } from './Synonyms';
import { Horizontal, Vertical } from 'mui';
import { Excludes } from './Excludes';

export const KeywordForm = (props = {}) => {
  return (
    <Vertical gap={2} {...props}>
      {/* ROW 1 */}
      <Horizontal gap={2}>
        <TextField label="Keyword" fullWidth size="small" />
        <FormControl fullWidth>
          <InputLabel>Accurracy</InputLabel>
          <Select
            onChange={console.log}
            defaultValue="complimentary"
            label="Accurracy"
            size="small"
          >
            <MenuItem selected value="partially">
              partially
            </MenuItem>
            <MenuItem value="exactly">exactly</MenuItem>
            <MenuItem value="complimentary">complimentary</MenuItem>
          </Select>
        </FormControl>
      </Horizontal>
      {/** ROW 2 */}
      <Horizontal gap={2}>
        <TextField label="Element" fullWidth size="small" />
        <TextField label="Class name" fullWidth size="small" />
      </Horizontal>

      {/* ROW 3 */}
      <Synonyms name="synonyms" />

      {/* ROW 4 */}
      <Excludes
        name="excludes"
        title="Exclusions"
        label="Exclude Item"
        ariaLabelAdd="add exclusion"
        btnLabel="Add Exclusion"
        ariaLabelDelete="delete exclusion"
      />

      {/* ROW 5 */}
      <Excludes
        name="ignorePunctuation"
        title="Ignore Punctuations"
        label="punctuation"
        ariaLabelAdd="add punctuation to ignore"
        btnLabel="Add Punctuation"
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
