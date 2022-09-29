import dotenv from "dotenv";

export const initializeEnv = () => {
  const baseEnv = dotenv.config().parsed;
  const env = dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  }).parsed;
  const localEnv = dotenv.config({
    path: `.env.${process.env.NODE_ENV}.local`,
  }).parsed;

  process.env = {
    ...baseEnv,
    ...env,
    ...localEnv,
  } as NodeJS.ProcessEnv
};
