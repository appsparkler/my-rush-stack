import dotenv from "dotenv";

export const initializeEnv = () => {
  dotenv.config().parsed;
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  }).parsed;
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}.local`,
  }).parsed;
};
