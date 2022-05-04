import { StringOrNumber } from 'common-types';
import { filter, find, map } from 'lodash/fp';
/**
 * Filters out items in an array
 * @param id - the id of the item you want to filter out
 * @returns A new array without the items having the `id`
 */
export const filterOutWithId = <T extends { id: StringOrNumber }>(
  id: StringOrNumber
) => filter<T>((item) => item.id !== id);

export const updateItemWithMatchingId = <T extends { id: StringOrNumber }>(
  updatedItem: T
) =>
  map<T, T>((item) =>
    item.id === updatedItem.id ? { ...updatedItem } : { ...item }
  );

export const findById = <T extends { id: StringOrNumber }>(
  id: StringOrNumber
) => find<T>((item) => item.id === id);
