import { filter, find, map } from 'lodash/fp';

/**
 * Filters out items in an array
 * @param id - the id of the item you want to filter out
 * @returns A new array without the items having the `id`
 */
export const filterOutWithId = <T extends { id?: IdType }, IdType = string>(
  id: IdType
) => filter<T>((item) => item.id !== id);

export const updateItemWithMatchingId = <
  T extends { id?: IdType },
  IdType = string
>(
  updatedItem: T
) =>
  map<T, T>((item) =>
    Boolean(item.id) && item.id === updatedItem.id
      ? { ...updatedItem }
      : { ...item }
  );

export const findById = <Obj extends { id?: Type }, Type = string>($id: Type) =>
  find<Obj>(({ id }) => Boolean(id) && id === $id);
