import { app } from './firebase-app'
import { CheckinTypesEnum, IAbhyasiCheckinApiStoreData, } from '@hfn-checkins/types';
import { map } from 'lodash/fp'
import {google, sheets_v4 as sheetsV4} from "googleapis";

const CHECKINS_COLLECTION_NAME = "checkins";
const NUMBER_OF_RECORDS = 500;

type AbhyasiIdCheckinDataSnapshot = FirebaseFirestore.QueryDocumentSnapshot<IAbhyasiCheckinApiStoreData>;

interface IResponse  {
  status: "success" | "error";
  message?: string;
}

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


const appendSpreadsheet = async (
  spreadsheetId: string,
  range: string,
  values: (string | undefined)[][]
): Promise<IResponse> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auth: any = new google.auth.GoogleAuth({
    keyFile: `./creds-${process.env.NODE_ENV}.json`,
    scopes: [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const service = google.sheets({ version: "v4", auth });
  const resource: sheetsV4.Params$Resource$Spreadsheets$Values$Append = {
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  };
  await service.spreadsheets.values.append(resource);

  return { status: "success" };
  } catch (error) {
    console.log('Error in appending spreadsheet', error);
    return {status: "error", message: error.message};
  }
}

const updateDocsWithUpdatedInReport = async (docs: AbhyasiIdCheckinDataSnapshot[]) => {
  try {
    const db = app.firestore();
    const batch = db.batch();
    docs.forEach((doc) => {
      batch.update(doc.ref, { updatedInReport: true });
    });
    await batch.commit();
  } catch (error) {
    console.log("Error in updateDocsWithUpdatedInReport", error);
  }
};

const updateReportForAbhyasiIdCheckins = async () => {
  try {
    const { data, docs } = await fetchAbhyasiIdCheckinsNotUpdatedInReport();
    const formattedDataForSheet = mapAbhyasiIdCheckinDataToCellValues(data);
    const response = await appendSpreadsheet(
      "1ByRuxAUL01phUtN2f_3Dxk9jt8EZtXSjofZIXsPX818",
      "AbhyasiIdCheckins!A1",
      formattedDataForSheet
    );
    if (response.status === "success") {
      await updateDocsWithUpdatedInReport(docs);
    }
  } catch (error) {
    console.log("Error in updateReportForAbhyasiIdCheckins", error);
  }
}

export const generateReport = async() => {
  await updateReportForAbhyasiIdCheckins();
}