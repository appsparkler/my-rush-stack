import { Alert, Box, IconButton, Snackbar } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import {
  MarkerCodeRenderer,
  MarkerCodeRendererProps,
} from '../MarkerCoderRenderer/MarkerCodeRenderer';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';

export type MarkerCodeRendererWithCopyProps = MarkerCodeRendererProps & {};

export const MarkerCodeRendererWithCopy = ({
  mark,
  isMarkArray,
  isRangesMarker: isRangesMaker,
  ranges,
  markerType,
  options,
}: MarkerCodeRendererWithCopyProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [textToCopy, setTextToCopy] = useState<string>('');

  const handleClickCopy = useCallback(() => {
    textareaRef.current?.select();
    document.execCommand('copy');
    setOpenSnackbar(true);
  }, []);

  const handleChange = useCallback<
    NonNullable<MarkerCodeRendererProps['onChange']>
  >((textToCopy) => {
    setTextToCopy(textToCopy);
  }, []);

  const handleClose = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  return (
    <Box position="relative">
      <MarkerCodeRenderer
        mark={mark}
        options={options}
        onChange={handleChange}
        isMarkArray={isMarkArray}
        markerType={markerType}
        isRangesMarker={isRangesMaker}
        ranges={ranges}
      />

      <Box position="absolute" top={1} right={1}>
        <IconButton aria-label="copy" color="primary" onClick={handleClickCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          copied!
        </Alert>
      </Snackbar>

      <Box position="absolute" right={10000}>
        <textarea ref={textareaRef} defaultValue={textToCopy}></textarea>
      </Box>
    </Box>
  );
};
