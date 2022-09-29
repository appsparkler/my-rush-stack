import { initializeEnv } from "./initializeEnv";
import { generateReport } from "./generateReport";

export const init = async() => {
  initializeEnv();
  await generateReport();
};
