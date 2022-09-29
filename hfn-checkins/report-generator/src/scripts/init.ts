import dotenv from "dotenv";

const initializeEnv = () => {
dotenv.config().parsed;
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
}).parsed;
dotenv.config({
  path: `.env.${process.env.NODE_ENV}.local`,
}).parsed;
}

export const init = () => {
  initializeEnv();
};
