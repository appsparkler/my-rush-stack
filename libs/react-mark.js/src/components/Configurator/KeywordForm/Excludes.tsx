import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import { findById, updateItemWithMatchingId } from 'common-utils';
import { uniqueId } from 'lodash/fp';
import { Vertical } from 'mui';
import React, { useCallback, useState } from 'react';
type ExcludeItem = {
  id: string;
  value: string;
};

const getDefaultExcludeItem = (): ExcludeItem => {
  return { id: uniqueId('exclude'), value: '' };
};

export const Excludes = (props: {}) => {
  const [value, setValue] = useState<ExcludeItem[]>([getDefaultExcludeItem()]);
  const handleChangeItem = useCallback<
    (id: string) => TextFieldProps['onChange']
  >(
    (id) =>
      ({ target: { value: $value } }) => {
        const ctxItem = findById<ExcludeItem>(id)(value);
        if (ctxItem) {
          const updatedItems: ExcludeItem[] =
            updateItemWithMatchingId<ExcludeItem>({
              ...ctxItem,
              value: $value,
            })(value);
          setValue(updatedItems);
        }
      },
    [value]
  );

  return (
    <Vertical gap={1}>
      <Typography variant="h6">Exclude</Typography>
      <Box>
        {value.map((item) => (
          <TextField
            label="Exclude Item"
            size="small"
            fullWidth
            type="text"
            key={item.id}
            value={item.value}
            onChange={handleChangeItem(item.id)}
          />
        ))}
      </Box>
    </Vertical>
  );
};
