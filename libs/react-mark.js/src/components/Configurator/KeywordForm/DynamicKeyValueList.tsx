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
import React, { useCallback, useEffect, useState } from 'react';

export type DynamicKeyValueListItem = {
  id: string;
  key: string;
  value: string;
};

export type DynamicKeyValueListProps = {
  title?: string;
  name?: string;
  keyInputProps?: TextFieldProps;
  valueInputProps?: TextFieldProps;
  onChange?: SimpleFormControlChange<DynamicKeyValueListItem[]>;
};

// Utils
export const uniqueIdKeyValueItem = () => uniqueId('synonym-item');

export const getDefaultSynonymItem = () => ({
  id: uniqueIdKeyValueItem(),
  key: '',
  value: '',
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
}: DynamicKeyValueListProps) => {
  const [$value, set$value] = useState<DynamicKeyValueListItem[]>([
    getDefaultSynonymItem(),
  ]);

  const handleClickAdd = useCallback(() => {
    set$value((prevValue) => [...prevValue, getDefaultSynonymItem()]);
  }, []);

  const handleClickDelete = useCallback(
    (id: string) => () =>
      set$value((prevValue) =>
        filterOutWithId<DynamicKeyValueListItem>(id)(prevValue)
      ),
    []
  );

  const handleChangeInput = useCallback<
    (id: string) => TextFieldProps['onChange']
  >(
    (id) =>
      ({ target: { value, name } }) => {
        const itemToUpdate = findById<DynamicKeyValueListItem>(id)($value);
        if (itemToUpdate) {
          const updatedItems =
            updateItemWithMatchingId<DynamicKeyValueListItem>({
              ...itemToUpdate,
              [name]: value,
            })($value);
          set$value(updatedItems);
        }
      },
    [$value]
  );

  useEffect(() => {
    onChange(name, $value);
  }, [$value, name, onChange]);

  return (
    <Box display="flex" gap={1} flexDirection="column">
      <Typography variant="h6">{title}</Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {$value.map(({ id, key, value }, index) => (
          <Box key={id} display="flex" gap={2} alignItems="center">
            <TextField
              {...keyInputProps}
              onChange={handleChangeInput(id)}
              value={key}
            />
            <TextField
              {...valueInputProps}
              onChange={handleChangeInput(id)}
              value={value}
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
                  onClick={handleClickDelete(id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
