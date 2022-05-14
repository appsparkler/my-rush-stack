"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.updateItemWithMatchingId = exports.filterOutWithId = void 0;
const fp_1 = require("lodash/fp");
/**
 * Filters out items in an array
 * @param id - the id of the item you want to filter out
 * @returns A new array without the items having the `id`
 */
const filterOutWithId = (id) => (0, fp_1.filter)((item) => item.id !== id);
exports.filterOutWithId = filterOutWithId;
const updateItemWithMatchingId = (updatedItem) => (0, fp_1.map)((item) => Boolean(item.id) && item.id === updatedItem.id
    ? Object.assign({}, updatedItem) : Object.assign({}, item));
exports.updateItemWithMatchingId = updateItemWithMatchingId;
const findById = ($id) => (0, fp_1.find)(({ id }) => Boolean(id) && id === $id);
exports.findById = findById;
//# sourceMappingURL=array-utils.js.map