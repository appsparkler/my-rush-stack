import {google, sheets_v4 as sheetsV4} from "googleapis";
import {IResponse} from "../../../types";
import {env} from "../..";

export const clearSpreadsheetRange = async (
    spreadsheetId: string,
    range: string,
): Promise<IResponse> => {
  const auth: any = new google.auth.GoogleAuth({
    keyFile: env.KEY_FILE as string,
    scopes: [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
  const service = google.sheets({version: "v4", auth});
  const resource: sheetsV4.Params$Resource$Spreadsheets$Values$Clear = {
    spreadsheetId,
    range,
    requestBody: {
      range,
    },
  };
  await service.spreadsheets.values.clear(resource);

  return {status: "success"};
};
