import { Add, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import {
  filterOutWithId,
  findById,
  updateItemWithMatchingId,
} from 'common-utils';
import { TextFieldChangeEventHandler } from 'common-types';
import { noop, uniqueId } from 'lodash/fp';
import { Horizontal, Vertical } from '../layouts';
import React, { useCallback } from 'react';

// utils
export const getDefaultInteactiveSimpleListItem = (): TextFieldProps => {
  return { id: uniqueId('interactive-simple-list-item'), value: '' };
};

// jsx
export type InteactiveSimpleListProps = {
  title?: string;
  label?: string;
  ariaLabelAdd?: string;
  ariaLabelDelete?: string;
  name?: string;
  value?: TextFieldProps[];
  onChange?: (name: string, value: TextFieldProps[]) => void;
};

export const InteactiveSimpleList = ({
  title = '',
  label = '',
  ariaLabelAdd = '',
  ariaLabelDelete = '',
  name = '',
  onChange = noop,
  value = [],
}: InteactiveSimpleListProps) => {
  const handleChangeItem = useCallback<
    (id: TextFieldProps['id']) => TextFieldChangeEventHandler
  >(
    (id) =>
      ({ target: { value: $value } }) => {
        if (id) {
          const ctxItem = findById<TextFieldProps, string>(id)(value);
          if (ctxItem) {
            const updatedItems: TextFieldProps[] =
              updateItemWithMatchingId<TextFieldProps>({
                ...ctxItem,
                value: $value,
              })(value);
            onChange(name, updatedItems);
          }
        }
      },
    [name, onChange, value]
  );

  const handleClickAdd = useCallback(() => {
    onChange(name, [...value, getDefaultInteactiveSimpleListItem()]);
  }, [name, onChange, value]);

  const handleClickDelete = useCallback<
    (id: TextFieldProps['id']) => () => void
  >(
    (id) => () => {
      if (id) {
        onChange(name, filterOutWithId<TextFieldProps>(id)(value));
      }
    },
    [name, onChange, value]
  );

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
              onChange={handleChangeItem(item.id)}
              {...item}
            />
            <Box>
              {index === 0 ? (
                <IconButton
                  aria-label={ariaLabelAdd}
                  color="primary"
                  size="small"
                  onClick={handleClickAdd}
                >
                  <Add />
                </IconButton>
              ) : (
                <IconButton
                  aria-label={ariaLabelDelete}
                  color="warning"
                  size="small"
                  onClick={handleClickDelete(item.id)}
                  disabled={index === 0}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </Horizontal>
        ))}
      </Vertical>
    </Vertical>
  );
};
