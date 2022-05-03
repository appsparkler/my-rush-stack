import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';

export const KeywordForm = (props: {}) => {
  return (
    <Box {...props} display="flex" flexDirection="column" gap={2}>
      {/* ROW 1 */}
      <Box display="flex" gap={2}>
        <TextField label="Keyword" fullWidth />
        <FormControl fullWidth>
          <InputLabel>Accurracy</InputLabel>
          <Select
            onChange={console.log}
            defaultValue="complimentary"
            label="Accurracy"
          >
            <MenuItem selected value="partially">
              partially
            </MenuItem>
            <MenuItem value="exactly">exactly</MenuItem>
            <MenuItem value="complimentary">complimentary</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/** ROW 2 */}
      <Box display="flex" gap={2}>
        <TextField label="Element" fullWidth />
        <TextField label="Class name" fullWidth />
      </Box>

      {/* ROW 3 */}
    </Box>
  );
};
