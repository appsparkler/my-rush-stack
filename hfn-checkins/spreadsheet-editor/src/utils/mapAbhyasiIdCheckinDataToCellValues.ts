import { map } from "lodash/fp";
import { IAbhyasiCheckinApiStoreData } from "../types";
import { getISTDateTimeFromTimestamp } from "./time";

export const mapAbhyasiIdCheckinDataToCellValues: (
  data: IAbhyasiCheckinApiStoreData[]
) => string[][] = map<IAbhyasiCheckinApiStoreData, string[]>(
  (abhyasiIdData) => {
    const [date, time]: string[] = getISTDateTimeFromTimestamp(
      abhyasiIdData.timestamp
    );

    const [reportDate, reportTime] = getISTDateTimeFromTimestamp(Date.now());

    return [
      reportDate,
      reportTime,
      date,
      time,
      abhyasiIdData.abhyasiId,
      abhyasiIdData.deviceId,
    ];
  }
);
