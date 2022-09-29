"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const baseEnv = dotenv_1.default.config().parsed;
const env = dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`,
}).parsed;
const localEnv = dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}.local`,
}).parsed;
console.log(Object.assign(Object.assign(Object.assign({}, env), baseEnv), localEnv));
//# sourceMappingURL=index.js.map