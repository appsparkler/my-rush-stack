import { filter, map, pipe } from 'lodash/fp';

export const filterOutFalsy = filter<string>((item) => Boolean(item));

export const getValues = <T extends { value?: ValueType }, ValueType = string>(
  values: T[]
) =>
  pipe<[{ value?: ValueType }[]], (string | undefined)[], string[]>(
    mapExcludesToValue,
    filterOutFalsy
  )(values);

export const mapExcludesToValue = <T extends { value?: unknown }>(
  values: T[]
) =>
  map<{ value?: unknown }, string | undefined>(({ value }) =>
    Boolean(value) && typeof value === 'string' ? String(value) : undefined
  )(values);
