import { TextField, TextFieldProps } from '@mui/material';
import React, { useCallback } from 'react';
import { noop } from 'lodash/fp';

export type SimpleTextFieldProps = {
  onChange: (name: string, value: string) => void;
} & TextFieldProps;

export type TextFieldChangeHandler = React.ChangeEventHandler<
  HTMLTextAreaElement | HTMLInputElement
>;
export const SimpleTextField = ({
  onChange = noop,
  ...props
}: SimpleTextFieldProps) => {
  const handleChange = useCallback<TextFieldChangeHandler>(
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
