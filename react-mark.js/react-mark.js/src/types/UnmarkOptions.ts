import { BaseOptions } from "./BaseOptions";

/**
 * @public
 */
export type UnmarkOptions = Omit<BaseOptions, "each" | "filter" | "noMatch">;
