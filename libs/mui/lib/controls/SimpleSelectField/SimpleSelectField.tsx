import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import React, { useCallback } from 'react';

import { noop } from 'lodash/fp';

export type SimpleSelectProps = {
  onChange?: (name: string, value: string) => void;
  name?: string;
  label?: string;
  value?: string;
  menuItems?: {
    id?: string;
    name?: string;
    value?: string;
  }[];
};

export const SimpleSelect = ({
  name = '',
  label = '',
  value = '',
  menuItems = [],
  onChange = noop,
}: SimpleSelectProps) => {
  const handleChange = useCallback<() => SelectProps<string>['onChange']>(
    () =>
      ({ target: { value } }) => {
        onChange(name, value);
      },
    [name, onChange]
  );
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select<string>
        onChange={handleChange()}
        value={value}
        label={label}
        size={'small'}
      >
        {menuItems.map(({ name, value, id }) => (
          <MenuItem selected key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
