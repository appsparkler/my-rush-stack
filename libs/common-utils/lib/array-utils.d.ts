/**
 * Filters out items in an array
 * @param id - the id of the item you want to filter out
 * @returns A new array without the items having the `id`
 */
export declare const filterOutWithId: <T extends {
    id?: IdType | undefined;
}, IdType = string>(id: IdType) => import("lodash/fp").LodashFilter2x1<T>;
export declare const updateItemWithMatchingId: <T extends {
    id?: IdType | undefined;
}, IdType = string>(updatedItem: T) => import("lodash/fp").LodashMap1x1<T, T>;
export declare const findById: <Obj extends {
    id?: Type | undefined;
}, Type = string>($id: Type) => import("lodash/fp").LodashFind2x1<Obj>;
//# sourceMappingURL=array-utils.d.ts.map