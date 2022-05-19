import React from 'react';
import { Grid } from '@mui/material';
import { SimpleTextField } from 'mui';
import { DynamicKeyValueList } from '../KeywordForm/DynamicKeyValueList';

export const RangesMarkerForm = () => {
  return (
    <Grid container spacing={2}>
      {/* COLUMN 1 */}
      <Grid item xs={12}>
        <DynamicKeyValueList
          title="Ranges"
          name="ranges"
          keyInputProps={{
            defaultValue: 10,
            label: 'start',
            name: 'start',
            size: 'small',
            type: 'number',
          }}
          valueInputProps={{
            defaultValue: 20,
            label: 'length',
            name: 'length',
            size: 'small',
            type: 'number',
          }}
        />
      </Grid>
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
