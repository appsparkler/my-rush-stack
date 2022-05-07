import { Add, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import {
  filterOutWithId,
  findById,
  updateItemWithMatchingId,
} from 'common-utils';
import { TextFieldChangeEventHandler } from 'common-types';
import { filter, noop, uniqueId } from 'lodash/fp';
import { Horizontal, Vertical } from '../layouts';
import React, { useCallback, useEffect, useState } from 'react';

type ExcludeItem = {
  id: string;
  value: string;
};

// utils
const getDefaultExcludeItem = (): ExcludeItem => {
  return { id: uniqueId('exclude'), value: '' };
};

// jsx
export type ExcludesProps = {
  title?: string;
  label?: string;
  ariaLabelAdd?: string;
  btnLabel?: string;
  ariaLabelDelete?: string;
  name?: string;
  onChange?: (name: string, value: ExcludeItem[]) => void;
};

export const InteactiveSimpleList = ({
  title = '',
  label = '',
  ariaLabelAdd = '',
  btnLabel = '',
  ariaLabelDelete = '',
  name = '',
  onChange = noop,
}: ExcludesProps) => {
  const [value, setValue] = useState<ExcludeItem[]>([getDefaultExcludeItem()]);
  const handleChangeItem = useCallback<
    (id: string) => TextFieldChangeEventHandler
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

  const handleClickAdd = useCallback(() => {
    setValue((prevValue) => [...prevValue, getDefaultExcludeItem()]);
  }, []);

  const handleClickDelete = useCallback<(id: string) => () => void>(
    (id) => () => {
      setValue((prevValue) => filterOutWithId<ExcludeItem>(id)(prevValue));
    },
    []
  );

  useEffect(() => {
    const filterOutEmptyValues = filter<ExcludeItem>((item) =>
      Boolean(item.value)
    );
    const refinedValues = filterOutEmptyValues(value);
    if (refinedValues.length > 0) onChange(name, refinedValues);
  }, [name, onChange, value]);

  return (
    <Vertical gap={1}>
      <Typography variant="h6">{title}</Typography>
      <Vertical gap={2}>
        {value.map((item, index) => (
          <Horizontal key={item.id}>
            <TextField
              label={label}
              size="small"
              fullWidth
              type="text"
              key={item.id}
              value={item.value}
              onChange={handleChangeItem(item.id)}
            />
            <Box>
              <IconButton
                aria-label={ariaLabelDelete}
                color="warning"
                size="small"
                onClick={handleClickDelete(item.id)}
                disabled={index === 0}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Horizontal>
        ))}
        <Box display="flex">
          <Button
            variant="contained"
            type="button"
            onClick={handleClickAdd}
            aria-label={ariaLabelAdd}
            startIcon={<Add />}
          >
            {btnLabel}
          </Button>
        </Box>
      </Vertical>
    </Vertical>
  );
};
