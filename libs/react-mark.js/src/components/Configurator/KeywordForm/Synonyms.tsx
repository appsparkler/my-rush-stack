import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
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
import { reduce, uniqueId } from 'lodash/fp';
import React, { useCallback, useEffect, useState } from 'react';

type SynonymItem = {
  id: string;
  key: string;
  value: string;
};

export type SynonymProps = {
  value?: SynonymItem[];
  onChange?: (updatedSynonyms: SynonymItem[]) => void;
};

// Utils
const uniqueIdSynonymItem = () => uniqueId('synonym-item');

const getDefaultSynonymItem = () => ({
  id: uniqueIdSynonymItem(),
  key: '',
  value: '',
});

const reduceToValidSynonyms = reduce<SynonymItem, SynonymItem[]>(
  (acc, item) => {
    if (item.key.length > 0 && item.value.length > 0) {
      return [...acc, item];
    }
    return [...acc];
  },
  []
);

// JSX
export const Synonyms = ({ onChange = noop }: SynonymProps) => {
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
    const validSynonyms = reduceToValidSynonyms($value);
    onChange(validSynonyms);
  }, [$value]);

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
            <Box>
              <IconButton
                aria-label="add synonym"
                color="warning"
                size="small"
                onClick={handleClickDelete(id)}
                disabled={index === 0}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box display="flex">
          <Button
            variant="contained"
            type="button"
            onClick={handleClickAdd}
            startIcon={<Add />}
          >
            Add Synonym
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
