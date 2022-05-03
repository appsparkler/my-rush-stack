import { Add, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { filter, uniqueId } from 'lodash/fp';
import React, { useCallback, useState } from 'react';

const uniqueIdSynonymItem = () => uniqueId('synonym-item');
type StringOrNumber = string | number;

/**
 * Filters out items in an array
 * @param id - the id of the item you want to filter out
 * @returns A new array without the items having the `id`
 */
const filterOutWithId = <T extends { id: StringOrNumber }>(
  id: StringOrNumber
) => filter<T>((item) => item.id !== id);

type SynonymItem = {
  id: StringOrNumber;
  key: string;
  value: string;
};

export type SynonymProps = {
  value?: SynonymItem[];
  onChange?: (updatedSynonyms: SynonymItem[]) => void;
};

export const Synonyms = ({ onChange }: SynonymProps) => {
  const [$value, set$value] = useState<SynonymItem[]>([
    { id: uniqueIdSynonymItem(), key: '', value: '' },
  ]);

  const handleClickAdd = useCallback(() => {
    set$value((prevValue) => [
      ...prevValue,
      { id: uniqueIdSynonymItem(), key: '', value: '' },
    ]);
  }, []);

  const handleClickDelete = useCallback(
    (id: StringOrNumber) => () =>
      set$value((prevValue) => filterOutWithId<SynonymItem>(id)(prevValue)),
    []
  );

  return (
    <Box display="flex" gap={1} flexDirection="column">
      <Typography variant="h6">Synonyms</Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {$value.map(({ id, key, value }, index) => (
          <Box key={id} display="flex" gap={2} alignItems="center">
            <TextField label="Word" value={key} size="small" />
            <TextField label="Synonym" value={value} size="small" />
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
