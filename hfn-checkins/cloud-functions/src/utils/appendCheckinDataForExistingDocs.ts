import {
  mapAbhyasiIdCheckinDataToCellValues,
} from "./appendCheckinData/spreadsheet-utils/mapAbhyasiIdCheckinDataToCellValues";
import {
  appendSpreadsheet,
  mapEmailOrMobileCheckinDataToCellValues,
} from "./appendCheckinData/spreadsheet-utils";
import {env} from "./env";
import {CheckinData, CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData,
  IAbhyasiCheckinApiStoreData} from "@hfn-checkins/types";

export const appendCheckinDataForExistingDocs = async (
    docs: CheckinData[]
): Promise<void> => {
  const abhyasiIdCheckins = docs.filter(
      (doc) => doc.type === CheckinTypesEnum.AbhyasiId
  );
  await appendSpreadsheet(
      env.SPREADSHEET_ID,
      "AbhyasiIdCheckins!A1",
      mapAbhyasiIdCheckinDataToCellValues(
      abhyasiIdCheckins as IAbhyasiCheckinApiStoreData[]
      )
  );
  const emailOrMobileCheckins = docs.filter(
      (doc) => doc.type === "EmailOrMobile"
  );
  await appendSpreadsheet(
      env.SPREADSHEET_ID,
      "EmailOrMobileCheckins!A1",
      mapEmailOrMobileCheckinDataToCellValues(
      emailOrMobileCheckins as CheckinWithEmailOrMobileApiStoreData[]
      )
  );
};
