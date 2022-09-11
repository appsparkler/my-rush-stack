import { google, sheets_v4 } from "googleapis";
import { IResponse } from "../types";
import { auth } from "../utils";

export const appendSpreadsheet = async (
  spreadsheetId: string,
  range: string,
  values: (string | undefined)[][]
): Promise<IResponse> => {
  const service = google.sheets({ version: "v4", auth });
  const resource: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  };
  await service.spreadsheets.values.append(resource);

  return { status: "success" };
};
