"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const initializeEnv_1 = require("./initializeEnv");
const generateReport_1 = require("./generateReport");
const init = async () => {
    (0, initializeEnv_1.initializeEnv)();
    await (0, generateReport_1.generateReport)();
};
exports.init = init;
//# sourceMappingURL=init.js.map