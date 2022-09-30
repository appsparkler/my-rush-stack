import { app } from './firebase-app'
import { CheckinTypesEnum, CheckinWithEmailOrMobileApiStoreData, IAbhyasiCheckinApiStoreData, } from '@hfn-checkins/types';
import { map } from 'lodash/fp'
import {google, sheets_v4 as sheetsV4} from "googleapis";
import { QueryDocumentSnapshot } from '@google-cloud/firestore';

const chalk = {
  green: (str: string) => str
}

const CHECKINS_COLLECTION_NAME = "checkins";
const NUMBER_OF_RECORDS = 500; // max limit is 500 on Google Sheets API

interface IMapEmailOrMobileCheckinDataToCellValues {
  (data: CheckinWithEmailOrMobileApiStoreData[]): (string | undefined)[][];
}

interface IResponse  {
  status: "success" | "error";
  message?: string;
}



const fetchCheckinsNotUpdatedInReport =
  async <T>(type: CheckinTypesEnum) => {
    try {
      const db = app.firestore();
      const abhyasiIdCheckinsNotUpdatedInReport = (await db
        .collection(CHECKINS_COLLECTION_NAME)
        .where("type", "==", type)
        .where("updatedInReport", "==", false)
        .limit(NUMBER_OF_RECORDS)
        .get()) as FirebaseFirestore.QuerySnapshot<T>;
      const docsAndData = abhyasiIdCheckinsNotUpdatedInReport.docs.map(
        (doc) => ({
          doc,
          data: doc.data(),
        })
      );

      return docsAndData.reduce(
        (acc, { doc, data }) => {
          return {
            docs: [...acc.docs, doc],
            data: [...acc.data, data],
          };
        },
        {
          docs: [] as QueryDocumentSnapshot<T>[],
          data: [] as T[],
        }
      );
    } catch (error) {
      throw new Error("Error in fetching abhyasiIdCheckinsNotUpdatedInReport");
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

const updateDocsWithUpdatedInReport = async (docs: QueryDocumentSnapshot[]) => {
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
    const { data, docs } = await fetchCheckinsNotUpdatedInReport<IAbhyasiCheckinApiStoreData>(CheckinTypesEnum.AbhyasiId);
    const mappedData = mapAbhyasiIdCheckinDataToCellValues(data);
    const response = await appendSpreadsheet(
      process.env.SHEET_ID,
      "AbhyasiIdCheckins!A1",
      mappedData
    );
    if (response.status === "success") {
      await updateDocsWithUpdatedInReport(docs);
      console.log(
        chalk.green(
          `${mappedData.length} AbhyasiId checkins updated in report`
        )
      );
    }
  } catch (error) {
    console.log("Error in updateReportForAbhyasiIdCheckins", error);
  }
}

const getGender = (gender: "M" | "F" | "U"): string => {
  switch (gender) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    case "U":
      return "Unspecified";
    default:
      return "Not Updated";
  }
};

const getValue = (emailOrMobile: string | undefined): string | undefined => emailOrMobile;

export const mapEmailOrMobileCheckinDataToCellValues: IMapEmailOrMobileCheckinDataToCellValues =
  map((data) => {
    const [date, time]: string[] = getISTDateTimeFromTimestamp(data.timestamp);

    const [reportDate, reportTime] = getISTDateTimeFromTimestamp(Date.now());

    return [
      reportDate,
      reportTime,
      date,
      time,
      data.fullName,
      getGender(data.gender),
      data.ageGroup,
      getValue((data as { mobile?: string }).mobile),
      getValue((data as { email?: string }).email),
      data.city,
      data.state,
      data.country,
      data.deviceId,
    ];
  });

const updateReportForEmailOrMobileCheckins = async () => {
  try {
    const { docs, data } =
      (await fetchCheckinsNotUpdatedInReport<
      CheckinWithEmailOrMobileApiStoreData>(CheckinTypesEnum.EmailOrMobile));
    const mappedData = mapEmailOrMobileCheckinDataToCellValues(data);
    const response = await appendSpreadsheet(
      process.env.SHEET_ID,
      "EmailOrMobileCheckins!A1",
      mappedData
    );
    if (response.status === "success") {
      await updateDocsWithUpdatedInReport(docs);
      console.log(chalk.green(`${mappedData.length} EmailOrMobile checkins updated in report`));
    }
  } catch (e) {
    console.error(e);
  }
}

export const generateReport = async() => {
  try {
    await updateReportForAbhyasiIdCheckins();
    await updateReportForEmailOrMobileCheckins();
  } catch (error) {
    console.log('Error in generateReport', error);
  }
}