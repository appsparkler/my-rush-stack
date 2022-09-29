"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const initializeEnv = () => {
    const baseEnv = dotenv_1.default.config().parsed;
    const env = dotenv_1.default.config({
        path: `.env.${process.env.NODE_ENV}`,
    }).parsed;
    const localEnv = dotenv_1.default.config({
        path: `.env.${process.env.NODE_ENV}.local`,
    }).parsed;
    process.env = Object.assign(Object.assign(Object.assign({}, baseEnv), env), localEnv);
};
exports.initializeEnv = initializeEnv;
//# sourceMappingURL=initializeEnv.js.map