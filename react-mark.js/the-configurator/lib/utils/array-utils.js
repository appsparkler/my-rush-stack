"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someAreTruthy = void 0;
const fp_1 = require("lodash/fp");
const someAreTruthy = (items) => (0, fp_1.some)((item) => Boolean(item))(items);
exports.someAreTruthy = someAreTruthy;
//# sourceMappingURL=array-utils.js.map