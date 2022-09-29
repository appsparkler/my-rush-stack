"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const initializeEnv = () => {
    dotenv_1.default.config().parsed;
    dotenv_1.default.config({
        path: `.env.${process.env.NODE_ENV}`,
    }).parsed;
    dotenv_1.default.config({
        path: `.env.${process.env.NODE_ENV}.local`,
    }).parsed;
};
const init = () => {
    initializeEnv();
};
exports.init = init;
//# sourceMappingURL=init.js.map