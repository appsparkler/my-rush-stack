import { Add, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

export const Synonyms = () => {
  return (
    <>
      <Typography variant="h6">Synonyms</Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {[
          { id: 1, key: 'foo', value: 'foolto' },
          { id: 2, key: 'bar', value: 'barto' },
        ].map(({ id, key, value }) => (
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
    </>
  );
};
