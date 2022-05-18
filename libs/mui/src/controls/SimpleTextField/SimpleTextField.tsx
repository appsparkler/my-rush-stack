import { TextField, TextFieldProps } from '@mui/material';
import React, { useCallback } from 'react';
import { noop } from 'lodash/fp';
import {
  SimpleFormControlChange,
  TextFieldChangeEventHandler,
} from 'common-types';

export type SimpleTextFieldProps = {
  onChange?: SimpleFormControlChange<string>;
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
  return (
    <div>
      <TextField onChange={handleChange} {...props} />
    </div>
  );
};
