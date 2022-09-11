import {EnvironmentVariables, NodeEnvType} from "../types";

export const env:EnvironmentVariables = {
  // "NODE_ENV": "production", // "development" while working with EMULATOR and "production" while working with deployed UI-app
  // "KEY_FILE": "./checkin-dev-98729-firebase-adminsdk-mk9g6-6170c4a671.json",
  // "SPREADSHEET_ID": "1Im460Xr32SMrzqw1a8-3NA5viHKw0oQ_t2IPffC2Y1M",
  // "REPORT_TAB_ID": "1330998376",
  // "REFRESH_DATABASE_PASSWORD": String(process.env.REFRESH_DATABASE_PASSWORD),
  NODE_ENV: String(process.env.NODE_ENV) as NodeEnvType,
  KEY_FILE: String(process.env.KEY_FILE),
  SPREADSHEET_ID: String(process.env.SPREADSHEET_ID),
  REPORT_TAB_ID: String(process.env.REPORT_TAB_ID),
  REFRESH_DATABASE_PASSWORD: String(process.env.REFRESH_DATABASE_PASSWORD),
};

// export const env:EnvironmentVariables = {
//   "NODE_ENV": "production",
//   "KEY_FILE": "./hfn-checkin-cb4a51a410a9.json",
//   "SPREADSHEET_ID": "1xVp03pcb3g5Kp820cOiztNOnak93SI364LWVopAQtyg",
// };

