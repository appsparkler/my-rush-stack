import {
  CheckinData,
  CheckinTypesEnum, CheckinWithEmailOrMobileApiStoreData, IAbhyasiCheckinApiStoreData,
} from "@hfn-checkins/types";
import {checkinsCollectionRef} from "../firestore";
import {env} from ".";
import {
  appendSpreadsheet, mapEmailOrMobileCheckinDataToCellValues,
} from "./appendCheckinData/spreadsheet-utils";
import {
  mapAbhyasiIdCheckinDataToCellValues,
} from "./appendCheckinData/spreadsheet-utils/mapAbhyasiIdCheckinDataToCellValues";
import {QuerySnapshot, WriteResult} from "@google-cloud/firestore";
import {config} from "./config";

const updateAbhyasiIdCheckins = (querySnapshot: QuerySnapshot<CheckinData>): Promise<WriteResult>[] => querySnapshot.docs.map((doc) =>
  doc.ref.update({
    updatedInReport: true,
  } as Partial<CheckinData>)
);

const getData = (querySnapshot: QuerySnapshot<CheckinData>): CheckinData[] => {
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};

export async function updateReportWithAbhyasiIdCheckins() {
  const checkinsNotUpdatedInReport = await checkinsCollectionRef
      .where("type", "==", CheckinTypesEnum.AbhyasiId.toString())
      .where("updatedInReport", "!=", true).get();
  const data = getData(checkinsNotUpdatedInReport);
  const mappedData = mapAbhyasiIdCheckinDataToCellValues(data as IAbhyasiCheckinApiStoreData[]);
  await appendSpreadsheet(
      env.SPREADSHEET_ID,
      config.tabs.abhyasiId,
      mappedData
  );
  await Promise.all(updateAbhyasiIdCheckins(checkinsNotUpdatedInReport));
}

export async function updateReportWithEmailOrMobileCheckins() {
  const checkinsNotUpdatedInReport = await checkinsCollectionRef
      .where("type", "==", CheckinTypesEnum.EmailOrMobile.toString())
      .where("updatedInReport", "!=", true).get();
  const data = getData(checkinsNotUpdatedInReport);
  const mappedData = mapEmailOrMobileCheckinDataToCellValues(data as CheckinWithEmailOrMobileApiStoreData[]);
  await appendSpreadsheet(
      env.SPREADSHEET_ID,
      config.tabs.emailOrMobile,
      mappedData
  );
  await Promise.all(updateAbhyasiIdCheckins(checkinsNotUpdatedInReport));
}
