import { Grid, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CompositeForm, OnChangeCompositeForm } from './CompositeForm';
import {
  MarkerCodeRendererWithCopy,
  MarkerCodeRendererWithCopyProps,
} from './MarkerCoderRendererWithCodeCopy';
import { MarkerDemo } from './MarkerDemo';

export const Configurator = () => {
  const [
    markerCodeRendererWithCopyConfig,
    setMarkerCodeRendererWithCopyConfig,
  ] = useState<MarkerCodeRendererWithCopyProps>({});
  const handleChangeConfig = useCallback<OnChangeCompositeForm>((config) => {
    setMarkerCodeRendererWithCopyConfig(config);
  }, []);

  const { mark, options = undefined } = markerCodeRendererWithCopyConfig;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Configurator</Typography>
          <Typography variant="h5">
            The configurator should help you understand{' '}
            <pre style={{ display: 'inline' }}>react-mark.js</pre> and its API.
            Just define your custom options to see what will be marked and view
            the generated code for your application.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CompositeForm onChange={handleChangeConfig} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MarkerDemo
            mark={mark as string}
            options={options}
            markerType={markerCodeRendererWithCopyConfig.markerType}
          />
        </Grid>
        <Grid item xs={12}>
          <MarkerCodeRendererWithCopy {...markerCodeRendererWithCopyConfig} />
        </Grid>
      </Grid>
    </>
  );
};
