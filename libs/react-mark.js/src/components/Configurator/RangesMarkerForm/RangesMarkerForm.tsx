import React from 'react';
import { Grid } from '@mui/material';
import { SimpleTextField } from 'mui';

export const RangesMarkerForm = () => {
  return (
    <Grid container spacing={2}>
      {/* COLUMN 1 */}
      <Grid item xs={6} sm={6}>
        <SimpleTextField
          fullWidth
          name="element"
          label="Element"
          type="text"
          value="mark"
          size="small"
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <SimpleTextField
          fullWidth
          name="className"
          label="Class Name"
          type="text"
          value=""
          size="small"
        />
      </Grid>
    </Grid>
  );
};
