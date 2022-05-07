import { StringOrNumber } from 'common-types';
/**
 * Filters out items in an array
 * @param id - the id of the item you want to filter out
 * @returns A new array without the items having the `id`
 */
export declare const filterOutWithId: <T extends {
    id: StringOrNumber;
}>(id: StringOrNumber) => import("lodash/fp").LodashFilter2x1<T>;
export declare const updateItemWithMatchingId: <T extends {
    id: StringOrNumber;
}>(updatedItem: T) => import("lodash/fp").LodashMap1x1<T, T>;
export declare const findById: <T extends {
    id: StringOrNumber;
}>(id: StringOrNumber) => import("lodash/fp").LodashFind2x1<T>;
//# sourceMappingURL=array-utils.d.ts.map