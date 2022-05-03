import { Box, BoxProps, IconButton } from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  MarkerCodeRenderer,
  MarkerCodeRendererProps,
} from '../MarkerCoderRenderer/MarkerCodeRenderer';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';

export type MarkerCodeRendererWithCopyProps = MarkerCodeRendererProps & {
  onCopy: (copiedText: string) => void;
};

export const MarkerCodeRendererWithCopy = ({
  mark,
  options,
  onCopy,
}: MarkerCodeRendererWithCopyProps) => {
  const [textToCopy, setTextToCopy] = useState<string>('');
  const handleClickCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy);
  }, []);
  const handleChange = useCallback<MarkerCodeRendererProps['onChange']>(
    (textToCopy) => {
      setTextToCopy(textToCopy);
    },
    []
  );
  return (
    <Box position="relative">
      <MarkerCodeRenderer
        mark={mark}
        options={options}
        onChange={handleChange}
      />

      <Box position="absolute" top={1} right={1}>
        <IconButton aria-label="copy" color="primary" onClick={handleClickCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
