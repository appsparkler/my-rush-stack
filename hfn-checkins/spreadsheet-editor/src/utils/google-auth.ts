import { google } from "googleapis";
import { env } from "./env";

export const auth: any = new google.auth.GoogleAuth({
  keyFile: env?.GOOGLE_APPLICATION_CREDENTIALS as string,
  scopes: [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});
