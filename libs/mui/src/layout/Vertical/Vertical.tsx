import { Box, BoxProps } from '@mui/material';
import React from 'react';

export type VerticalProps = BoxProps;

export const Vertical = (props: VerticalProps) => {
  return <Box display="flex" flexDirection={'column'} {...props} />;
};
