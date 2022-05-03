import { StringOrNumber } from 'common-types';
import { filter } from 'lodash/fp';
/**
 * Filters out items in an array
 * @param id - the id of the item you want to filter out
 * @returns A new array without the items having the `id`
 */
export const filterOutWithId = <T extends { id: StringOrNumber }>(
  id: StringOrNumber
) => filter<T>((item) => item.id !== id);
