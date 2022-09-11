import {
  appendSpreadsheet,
  mapEmailOrMobileCheckinDataToCellValues,
} from "./spreadsheet-utils";
import {IResponse} from "../../types";
import {CheckinData, CheckinTypesEnum} from "@hfn-checkins/types";
import {
  mapAbhyasiIdCheckinDataToCellValues,
} from "./spreadsheet-utils/mapAbhyasiIdCheckinDataToCellValues";
export * from "../../types";
import {env} from "../../utils";
import {reject} from "lodash";

export const appendCheckinDataDelayed = (
    data: CheckinData
): Promise<IResponse> =>
  new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const res = await appendCheckinData(data);
        resolve(res);
      } catch (error) {
        reject(error as Error);
      }
    }, 1000);
  });

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
