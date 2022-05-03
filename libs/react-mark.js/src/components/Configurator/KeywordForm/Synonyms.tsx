import { Add, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

type SynonymItem = {
  id: number;
  key: string;
  value: string;
};

export type SynonymProps = {
  value?: SynonymItem[];
};

export const Synonyms = ({ value = [] }: SynonymProps) => {
  return (
    <Box display="flex" gap={1} flexDirection="column">
      <Typography variant="h6">Synonyms</Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {value.map(({ id, key, value }) => (
          <Box key={id} display="flex" gap={2} alignItems="center">
            <TextField label="Word" value={key} size="small" />
            <TextField label="Synonym" value={value} size="small" />
            <Box>
              <IconButton aria-label="add synonym" color="warning" size="small">
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box display="flex">
          <Button variant="contained" startIcon={<Add />}>
            Add Synonym
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
