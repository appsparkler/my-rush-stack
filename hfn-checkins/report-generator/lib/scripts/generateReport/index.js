"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.mapAbhyasiIdCheckinDataToCellValues = exports.getISTDateTimeFromTimestamp = void 0;
const firebase_app_1 = require("./firebase-app");
const types_1 = require("@hfn-checkins/types");
const fp_1 = require("lodash/fp");
const googleapis_1 = require("googleapis");
const CHECKINS_COLLECTION_NAME = "checkins";
const NUMBER_OF_RECORDS = 500;
const fetchAbhyasiIdCheckinsNotUpdatedInReport = async () => {
    try {
        const db = firebase_app_1.app.firestore();
        const abhyasiIdCheckinsNotUpdatedInReport = (await db
            .collection(CHECKINS_COLLECTION_NAME)
            .where("type", "==", types_1.CheckinTypesEnum.AbhyasiId)
            .where("updatedInReport", "==", false)
            .limit(NUMBER_OF_RECORDS)
            .get());
        console.log(abhyasiIdCheckinsNotUpdatedInReport.size);
        const docsAndData = abhyasiIdCheckinsNotUpdatedInReport.docs.map((doc) => ({
            doc,
            data: doc.data(),
        }));
        return docsAndData.reduce((acc, { doc, data }) => {
            return {
                docs: [...acc.docs, doc],
                data: [...acc.data, data],
            };
        }, {
            docs: [],
            data: [],
        });
    }
    catch (error) {
        throw new Error("Error in fetching abhyasiIdCheckinsNotUpdatedInReport");
    }
};
function getDefaultAbhyasiData() {
    return {
        abhyasiId: "",
        deviceId: "",
        timestamp: 0,
        type: types_1.CheckinTypesEnum.AbhyasiId,
        updatedInReport: false,
    };
}
function getISTDateTimeFromTimestamp(timestamp) {
    return new Date(timestamp)
        .toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
        .split(", ");
}
exports.getISTDateTimeFromTimestamp = getISTDateTimeFromTimestamp;
exports.mapAbhyasiIdCheckinDataToCellValues = (0, fp_1.map)((abhyasiIdData = getDefaultAbhyasiData()) => {
    const [date, time] = getISTDateTimeFromTimestamp(abhyasiIdData.timestamp);
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
});
const appendSpreadsheet = async (spreadsheetId, range, values) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: `./creds-${process.env.NODE_ENV}.json`,
            scopes: [
                "https://www.googleapis.com/auth/cloud-platform",
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/spreadsheets",
            ],
        });
        const service = googleapis_1.google.sheets({ version: "v4", auth });
        const resource = {
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values,
            },
        };
        await service.spreadsheets.values.append(resource);
        return { status: "success" };
    }
    catch (error) {
        console.log('Error in appending spreadsheet', error);
        return { status: "error", message: error.message };
    }
};
const updateDocsWithUpdatedInReport = async (docs) => {
    try {
        const db = firebase_app_1.app.firestore();
        const batch = db.batch();
        docs.forEach((doc) => {
            batch.update(doc.ref, { updatedInReport: true });
        });
        await batch.commit();
    }
    catch (error) {
        console.log("Error in updateDocsWithUpdatedInReport", error);
    }
};
const updateReportForAbhyasiIdCheckins = async () => {
    try {
        const { data, docs } = await fetchAbhyasiIdCheckinsNotUpdatedInReport();
        const formattedDataForSheet = (0, exports.mapAbhyasiIdCheckinDataToCellValues)(data);
        const response = await appendSpreadsheet("1ByRuxAUL01phUtN2f_3Dxk9jt8EZtXSjofZIXsPX818", "AbhyasiIdCheckins!A1", formattedDataForSheet);
        if (response.status === "success") {
            await updateDocsWithUpdatedInReport(docs);
        }
    }
    catch (error) {
        console.log("Error in updateReportForAbhyasiIdCheckins", error);
    }
};
const generateReport = async () => {
    await updateReportForAbhyasiIdCheckins();
};
exports.generateReport = generateReport;
//# sourceMappingURL=index.js.map