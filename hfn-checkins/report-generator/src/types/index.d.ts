declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      FIREBASE_CREDENTIALS_PATH: string;
    }
  }
}

export { }