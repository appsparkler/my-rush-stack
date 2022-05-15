import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';
import { SimpleFormControlChange } from 'common-types';
import { noop } from 'lodash/fp';
import React from 'react';
import { useCallback } from 'react';

export type SimpleCheckboxProps = Partial<
  Omit<FormControlLabelProps, 'onChange'>
> & {
  onChange?: SimpleFormControlChange<boolean>;
  label?: string;
};

//
export const SimpleCheckbox = ({
  checked,
  name = '',
  label = '',
  onChange = noop,
  ...restProps
}: SimpleCheckboxProps) => {
  const handleChange = useCallback<
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
  >(
    ({ target: { checked, name } }) => {
      onChange(name, checked);
    },
    [onChange]
  );
  return (
    <FormControlLabel
      name={name}
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={label}
      {...restProps}
    />
  );
};
