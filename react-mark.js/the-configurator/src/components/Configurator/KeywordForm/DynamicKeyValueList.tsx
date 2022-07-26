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
  field1: TextFieldProps;
  field2: TextFieldProps;
};

export type DynamicKeyValueListProps = {
  title?: string;
  name?: string;
  value?: DynamicKeyValueListItem[];
  onChange?: SimpleFormControlChange<DynamicKeyValueListItem[]>;
};

// Utils
export const uniqueIdKeyValueItem = () => uniqueId('synonym-item');

// JSX
export const DynamicKeyValueList = ({
  name = '',
  title = '',
  onChange = noop,
  value = [],
}: DynamicKeyValueListProps) => {
  const handleClickAdd = useCallback(() => {
    onChange(name, [
      ...value,
      {
        field1: {
          ...(value[0].field1 as TextFieldProps),
          value: '',
        },
        field2: {
          ...(value[0].field2 as TextFieldProps),
          value: '',
        },
        id: uniqueIdKeyValueItem(),
      },
    ]);
  }, [name, onChange, value]);

  const handleClickDelete = useCallback(
    (id: string) => () => {
      onChange(name, filterOutWithId<DynamicKeyValueListItem>(id)(value));
    },
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
              [$name]: {
                ...itemToUpdate[$name as 'field1' | 'field2'],
                value: $value,
              },
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
              name="field1"
              onChange={handleChangeInput(item.id)}
              {...item.field1}
            />
            <TextField
              fullWidth
              onChange={handleChangeInput(item.id)}
              name="field2"
              {...item.field2}
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
