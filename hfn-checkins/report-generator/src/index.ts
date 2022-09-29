import dotenv from 'dotenv';

const baseEnv = dotenv.config().parsed;
const env = dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;
const localEnv = dotenv.config({
  path: `.env.${process.env.NODE_ENV}.local`,
}).parsed;

console.log({
  ...env,
  ...baseEnv,
  ...localEnv
})
