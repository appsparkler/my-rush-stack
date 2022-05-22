import { Grid, Typography } from '@mui/material';
import React from 'react';
import { CompositeForm } from './CompositeForm';
import { MarkerCodeRendererWithCopy } from './MarkerCoderRendererWithCodeCopy';
import { MarkerDemo } from './MarkerDemo';

export const Configurator = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Configurator</Typography>
          <Typography variant="h4">
            The configurator should help you understand{' '}
            <pre style={{ display: 'inline' }}>react-mark.js</pre> and its API.
            Just define your custom options to see what will be marked and view
            the generated code for your application.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CompositeForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MarkerDemo />
        </Grid>
        <Grid item xs={12}>
          <MarkerCodeRendererWithCopy />
        </Grid>
      </Grid>
    </>
  );
};
