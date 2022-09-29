import { initializeEnv } from "./initializeEnv";
import { generateReport } from "./generateReport";

export const init = () => {
  initializeEnv();
  generateReport();
};
