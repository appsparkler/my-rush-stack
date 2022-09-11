import {google, sheets_v4 as sheetsV4} from "googleapis";
import {IResponse} from "../../../types";
import {env} from "../..";

export const appendSpreadsheet = async (
    spreadsheetId: string,
    range: string,
    values: (string | undefined)[][]
): Promise<IResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auth: any = new google.auth.GoogleAuth({
    keyFile: env.KEY_FILE as string,
    scopes: [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const service = google.sheets({version: "v4", auth});
  const resource: sheetsV4.Params$Resource$Spreadsheets$Values$Append = {
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  };
  await service.spreadsheets.values.append(resource);

  return {status: "success"};
};


