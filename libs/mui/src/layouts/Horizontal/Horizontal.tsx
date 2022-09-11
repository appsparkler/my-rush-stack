import { Box, BoxProps } from '@mui/material';
import React from 'react';

export type HorizontalProps = BoxProps;

export const Horizontal = (props: HorizontalProps) => {
  return <Box display="flex" flexDirection={'row'} {...props} />;
};
