import { TextField, TextFieldProps } from '@mui/material';
import React, { useCallback } from 'react';
import { noop } from 'lodash/fp';
import { TextFieldChangeEventHandler } from 'common-types';

export type SimpleTextFieldProps = {
  onChange: (name: string, value: string) => void;
} & Omit<TextFieldProps, 'onChange'>;

export const SimpleTextField = ({
  onChange = noop,
  ...props
}: SimpleTextFieldProps) => {
  const handleChange = useCallback<TextFieldChangeEventHandler>(
    (evt) => {
      const {
        target: { value = '', name = '' },
      } = evt;
      onChange(name, value);
    },
    [onChange]
  );
  return <TextField onChange={handleChange} {...props} />;
};
