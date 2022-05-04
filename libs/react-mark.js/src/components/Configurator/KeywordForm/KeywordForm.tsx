import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { Synonyms } from './Synonyms';
import { Horizontal, Vertical } from 'mui';

export const KeywordForm = (props: {}) => {
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
      <Box display="flex" gap={2}>
        <TextField label="Element" fullWidth size="small" />
        <TextField label="Class name" fullWidth size="small" />
      </Box>

      {/* ROW 3 */}
      <Synonyms />
    </Vertical>
  );
};
