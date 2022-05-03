import { Box, BoxProps, IconButton } from '@mui/material';
import React, { useCallback } from 'react';
import { MarkerCodeRenderer } from '../MarkerCoderRenderer/MarkerCodeRenderer';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
export type MarkerCodeRendererProps = {
  mark: string;
  options: {};
  wrapperProps: BoxProps;
};

export type MarkerCodeRendererWithCopyProps = MarkerCodeRendererProps & {
  onCopy: (copiedText: string) => void;
};

export const MarkerCodeRendererWithCopy = ({
  mark,
  options,
  onCopy,
}: MarkerCodeRendererWithCopyProps) => {
  const handleClickCopy = useCallback(() => {
    navigator.clipboard.writeText('');
  }, []);

  return (
    <Box position="relative">
      <MarkerCodeRenderer mark={mark} options={options} />

      <Box position="absolute" top={1} right={1}>
        <IconButton aria-label="copy" color="primary" onClick={handleClickCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
