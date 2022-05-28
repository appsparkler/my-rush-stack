import { filter, map, pipe } from 'lodash/fp';
export * from './array-utils';

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

// https://stackoverflow.com/a/55258958/4742733
export const stringToRegex = (str: string) => {
  const stringMatch = str.match(/\/(.+)\/.*/);
  // Main regex
  const main = stringMatch ? stringMatch[1] : '';

  const optionsMatch = str.match(/\/.+\/(.*)/);
  // Regex options
  const options = optionsMatch ? optionsMatch[1] : '';

  // Compiled regex
  try {
    const re = new RegExp(main, options);
    return re;
  } catch (error) {
    return new RegExp('');
  }
};
