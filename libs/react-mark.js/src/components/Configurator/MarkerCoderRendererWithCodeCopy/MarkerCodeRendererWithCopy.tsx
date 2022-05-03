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

  const handleChange = useCallback<MarkerCodeRendererProps['onChange']>(
    (textToCopy) => {
      setTextToCopy(textToCopy);
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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

      <Box position="absolute" left={10000}>
        <textarea ref={textareaRef} value={textToCopy}>
          {textToCopy}
        </textarea>
      </Box>
    </Box>
  );
};
