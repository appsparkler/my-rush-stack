import dotenv from "dotenv";
import { EnvironmentVariables } from "../types";

const configuredEnv = dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const env = configuredEnv.parsed as EnvironmentVariables;
