import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  TextFieldProps,
} from '@mui/material';
import {
  filterOutWithId,
  updateItemWithMatchingId,
  findById,
} from 'common-utils';
import { noop } from 'lodash';
import { uniqueId } from 'lodash/fp';
import React, { useCallback, useEffect, useState } from 'react';

type SynonymItem = {
  id: string;
  key: string;
  value: string;
};

export type SynonymProps = {
  name?: string;
  onChange?: (name: string, updatedSynonyms: SynonymItem[]) => void;
};

// Utils
export const uniqueIdSynonymItem = () => uniqueId('synonym-item');

export const getDefaultSynonymItem = () => ({
  id: uniqueIdSynonymItem(),
  key: '',
  value: '',
});

// JSX
export const Synonyms = ({ name = '', onChange = noop }: SynonymProps) => {
  const [$value, set$value] = useState<SynonymItem[]>([
    getDefaultSynonymItem(),
  ]);

  const handleClickAdd = useCallback(() => {
    set$value((prevValue) => [...prevValue, getDefaultSynonymItem()]);
  }, []);

  const handleClickDelete = useCallback(
    (id: string) => () =>
      set$value((prevValue) => filterOutWithId<SynonymItem>(id)(prevValue)),
    []
  );

  const handleChangeInput = useCallback<
    (id: string) => TextFieldProps['onChange']
  >(
    (id) =>
      ({ target: { value, name } }) => {
        const itemToUpdate = findById<SynonymItem>(id)($value);
        if (itemToUpdate) {
          const updatedItems = updateItemWithMatchingId<SynonymItem>({
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
      <Typography variant="h6">Synonyms</Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {$value.map(({ id, key, value }, index) => (
          <Box key={id} display="flex" gap={2} alignItems="center">
            <TextField
              label="Word"
              value={key}
              size="small"
              name="key"
              onChange={handleChangeInput(id)}
            />
            <TextField
              label="Synonym"
              value={value}
              size="small"
              name="value"
              onChange={handleChangeInput(id)}
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
