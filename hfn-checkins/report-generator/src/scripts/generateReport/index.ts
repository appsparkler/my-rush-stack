import { app } from './firebase-app'
import { CheckinTypesEnum, IAbhyasiCheckinApiStoreData, } from '@hfn-checkins/types';
import { map } from 'lodash/fp'

const CHECKINS_COLLECTION_NAME = "checkins";
const NUMBER_OF_RECORDS = 1;

type AbhyasiIdCheckinDataSnapshot = FirebaseFirestore.QueryDocumentSnapshot<IAbhyasiCheckinApiStoreData>;


interface FetchAbhyasiIdCheckinsNotUpdatedInReport {
  (): Promise<{
    docs: AbhyasiIdCheckinDataSnapshot[];
    data: IAbhyasiCheckinApiStoreData[];
  }>;
}

const fetchAbhyasiIdCheckinsNotUpdatedInReport: FetchAbhyasiIdCheckinsNotUpdatedInReport =
  async () => {
    try {
      const db = app.firestore();
      const abhyasiIdCheckinsNotUpdatedInReport = (await db
        .collection(CHECKINS_COLLECTION_NAME)
        .where("type", "==", CheckinTypesEnum.AbhyasiId)
        .where("updatedInReport", "==", false)
        .limit(NUMBER_OF_RECORDS)
        .get()) as FirebaseFirestore.QuerySnapshot<IAbhyasiCheckinApiStoreData>;
      console.log(abhyasiIdCheckinsNotUpdatedInReport.size);
      const docsAndData = abhyasiIdCheckinsNotUpdatedInReport.docs.map((doc) => ({
        doc,
        data: doc.data() as IAbhyasiCheckinApiStoreData,
      }));

      return docsAndData.reduce(
        (acc, { doc, data }) => {
          return {
            docs: [...acc.docs, doc],
            data: [...acc.data, data],
          };
        },
        {
          docs: [] as AbhyasiIdCheckinDataSnapshot[],
          data: [] as IAbhyasiCheckinApiStoreData[],
        }
      );
    } catch (error) {

      throw new Error("Error in fetching abhyasiIdCheckinsNotUpdatedInReport")
    }
  };

function getDefaultAbhyasiData(): IAbhyasiCheckinApiStoreData {
  return {
    abhyasiId: "",
    deviceId: "",
    timestamp: 0,
    type: CheckinTypesEnum.AbhyasiId,
    updatedInReport: false,
  };
}

export function getISTDateTimeFromTimestamp(timestamp: number): string[] {
  return new Date(timestamp)
    .toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
    .split(", ");
}

export const mapAbhyasiIdCheckinDataToCellValues: (
  data: IAbhyasiCheckinApiStoreData[]
) => string[][] = map<IAbhyasiCheckinApiStoreData, string[]>(
  (abhyasiIdData = getDefaultAbhyasiData()) => {
    const [date, time]: string[] = getISTDateTimeFromTimestamp(
      abhyasiIdData.timestamp
    );

    const [reportDate, reportTime] = getISTDateTimeFromTimestamp(Date.now());
    console.log({ abhyasiIdData });
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

const updateReportForAbhyasiIdCheckins = async () => {
  try {
    const { data } = await fetchAbhyasiIdCheckinsNotUpdatedInReport();
    const formattedDataForSheet = mapAbhyasiIdCheckinDataToCellValues(data);
    console.log({ formattedDataForSheet })
  } catch (error) {
    console.log('Error in updating report for abhyasiIdCheckins', error);
  }
}

export const generateReport = async() => {
  await updateReportForAbhyasiIdCheckins();
}