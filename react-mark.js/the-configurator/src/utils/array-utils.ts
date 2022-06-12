import { some } from 'lodash/fp';

export const someAreTruthy = <T>(items: T[]) =>
  some<T>((item) => Boolean(item))(items);
