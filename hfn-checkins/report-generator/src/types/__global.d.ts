declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      SHEET_ID: string;
    }
  }
}
export { };
