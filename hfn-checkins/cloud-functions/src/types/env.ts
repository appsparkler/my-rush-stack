export type NodeEnvType = "development" | "production";

export type EnvironmentVariables = {
  NODE_ENV: NodeEnvType;
  SPREADSHEET_ID: string;
  KEY_FILE: string;
  REPORT_TAB_ID: string;
  REFRESH_DATABASE_PASSWORD: string;
};
