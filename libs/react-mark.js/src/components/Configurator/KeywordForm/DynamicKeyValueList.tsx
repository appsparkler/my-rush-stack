import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  TextFieldProps,
} from '@mui/material';
import { SimpleFormControlChange } from 'common-types';
import {
  filterOutWithId,
  updateItemWithMatchingId,
  findById,
} from 'common-utils';
import { noop } from 'lodash';
import { uniqueId } from 'lodash/fp';
import { Horizontal } from 'mui';
import React, { useCallback } from 'react';

export type DynamicKeyValueListItem = {
  id: string;
  [key: string]: string;
};

export type DynamicKeyValueListProps = {
  title?: string;
  name?: string;
  value?: DynamicKeyValueListItem[];
  keyInputProps?: TextFieldProps;
  valueInputProps?: TextFieldProps;
  onChange?: SimpleFormControlChange<DynamicKeyValueListItem[]>;
};

// Utils
export const uniqueIdKeyValueItem = () => uniqueId('synonym-item');

export const getDefaultDynamicKeyValueItem = (
  keyName: string = 'key',
  valueName: string = 'value'
) => ({
  id: uniqueIdKeyValueItem(),
  [keyName]: '',
  [valueName]: '',
});

// JSX
export const DynamicKeyValueList = ({
  name = '',
  title = 'Synonyms',
  onChange = noop,
  keyInputProps = {
    label: 'keyword',
    name: 'key',
    size: 'small',
    type: 'text',
  },
  valueInputProps = {
    label: 'synonym',
    name: 'value',
    size: 'small',
    type: 'text',
  },
  value = [
    getDefaultDynamicKeyValueItem(keyInputProps.name, valueInputProps.name),
  ],
}: DynamicKeyValueListProps) => {
  const handleClickAdd = useCallback(() => {
    onChange(name, [
      ...value,
      getDefaultDynamicKeyValueItem(keyInputProps.name, valueInputProps.name),
    ]);
  }, [keyInputProps.name, name, onChange, value, valueInputProps.name]);

  const handleClickDelete = useCallback(
    (id: string) => () =>
      onChange(name, filterOutWithId<DynamicKeyValueListItem>(id)(value)),
    [name, onChange, value]
  );

  const handleChangeInput = useCallback<
    (id: string) => TextFieldProps['onChange']
  >(
    (id) =>
      ({ target: { value: $value, name: $name } }) => {
        const itemToUpdate = findById<DynamicKeyValueListItem>(id)(value);
        if (itemToUpdate) {
          const updatedItems =
            updateItemWithMatchingId<DynamicKeyValueListItem>({
              ...itemToUpdate,
              [$name]: $value,
            })(value);
          onChange(name, updatedItems);
        }
      },
    [name, onChange, value]
  );

  return (
    <Box display="flex" gap={1} flexDirection="column">
      <Typography variant="h6">{title}</Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {value.map((item, index) => (
          <Horizontal gap={2} alignItems="center" key={item.id}>
            <TextField
              fullWidth
              {...keyInputProps}
              onChange={handleChangeInput(item.id)}
              value={item[keyInputProps.name || 'key']}
            />
            <TextField
              fullWidth
              {...valueInputProps}
              onChange={handleChangeInput(item.id)}
              value={item[valueInputProps.name || 'value']}
            />
            {index === 0 ? (
              <Box>
                <IconButton
                  aria-label="add synonym"
                  color="primary"
                  size="small"
                  onClick={handleClickAdd}
                >
                  <Add />
                </IconButton>
              </Box>
            ) : (
              <Box>
                <IconButton
                  aria-label="delete synonym"
                  color="warning"
                  size="small"
                  onClick={handleClickDelete(item.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Horizontal>
        ))}
      </Box>
    </Box>
  );
};
