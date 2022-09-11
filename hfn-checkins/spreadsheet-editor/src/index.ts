import {
  appendSpreadsheet,
  env,
  mapEmailOrMobileCheckinDataToCellValues,
} from "./utils";
import { data as checkinMockedData } from "./data";
import { CheckinData, CheckinTypesEnum, IResponse } from "./types";
import { mapAbhyasiIdCheckinDataToCellValues } from "./utils/mapAbhyasiIdCheckinDataToCellValues";
export * from "./types";

export const appendCheckinData = async (
  data: CheckinData
): Promise<IResponse> => {
  if (data.type === CheckinTypesEnum.AbhyasiId) {
    const res = await appendSpreadsheet(
      env.SPREADSHEET_ID,
      "AbhyasiIdCheckins!A1",
      mapAbhyasiIdCheckinDataToCellValues([data])
    );
    return res;
  } else if (data.type === CheckinTypesEnum.EmailOrMobile) {
    const res = await appendSpreadsheet(
      env.SPREADSHEET_ID,
      "EmailOrMobileCheckins!A1",
      mapEmailOrMobileCheckinDataToCellValues([data])
    );
    return res;
  }
  return {
    status: "error",
    message: `${JSON.stringify(data, null, 2)} not appended`,
  };
};

// const main = async (data: CheckinData[]): Promise<IResponse> => {
//   try {
//     const promises = data.map(appendCheckinData);
//     await Promise.all(promises);
//     return { status: "success" };
//   } catch (err) {
//     console.error(err);
//     return { status: "error", message: err.message };
//   }
// };

// main(checkinMockedData)
//   .then(() => console.log("Done"))
//   .catch((err) => console.error(err));

// http://localhost:3000/check-in-success
// http://localhost:5001/checkin-dev-98729/us-central1/copyAllDataToGoogleSheet
