"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.mapEmailOrMobileCheckinDataToCellValues = exports.mapAbhyasiIdCheckinDataToCellValues = exports.getISTDateTimeFromTimestamp = void 0;
const firebase_app_1 = require("./firebase-app");
const types_1 = require("@hfn-checkins/types");
const fp_1 = require("lodash/fp");
const googleapis_1 = require("googleapis");
const chalk = {
    green: (str) => str
};
const CHECKINS_COLLECTION_NAME = "checkins";
const NUMBER_OF_RECORDS = 500; // max limit is 500 on Google Sheets API
const fetchCheckinsNotUpdatedInReport = async (type) => {
    try {
        const db = firebase_app_1.app.firestore();
        const abhyasiIdCheckinsNotUpdatedInReport = (await db
            .collection(CHECKINS_COLLECTION_NAME)
            .where("type", "==", type)
            .where("updatedInReport", "==", false)
            .limit(NUMBER_OF_RECORDS)
            .get());
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
        const { data, docs } = await fetchCheckinsNotUpdatedInReport(types_1.CheckinTypesEnum.AbhyasiId);
        const mappedData = (0, exports.mapAbhyasiIdCheckinDataToCellValues)(data);
        const response = await appendSpreadsheet(process.env.SHEET_ID, "AbhyasiIdCheckins!A1", mappedData);
        if (response.status === "success") {
            await updateDocsWithUpdatedInReport(docs);
            console.log(chalk.green(`${mappedData.length} AbhyasiId checkins updated in report`));
        }
    }
    catch (error) {
        console.log("Error in updateReportForAbhyasiIdCheckins", error);
    }
};
const getGender = (gender) => {
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
const getValue = (emailOrMobile) => emailOrMobile;
exports.mapEmailOrMobileCheckinDataToCellValues = (0, fp_1.map)((data) => {
    const [date, time] = getISTDateTimeFromTimestamp(data.timestamp);
    const [reportDate, reportTime] = getISTDateTimeFromTimestamp(Date.now());
    return [
        reportDate,
        reportTime,
        date,
        time,
        data.fullName,
        getGender(data.gender),
        data.ageGroup,
        getValue(data.mobile),
        getValue(data.email),
        data.city,
        data.state,
        data.country,
        data.deviceId,
    ];
});
const updateReportForEmailOrMobileCheckins = async () => {
    try {
        const { docs, data } = (await fetchCheckinsNotUpdatedInReport(types_1.CheckinTypesEnum.EmailOrMobile));
        const mappedData = (0, exports.mapEmailOrMobileCheckinDataToCellValues)(data);
        const response = await appendSpreadsheet(process.env.SHEET_ID, "EmailOrMobileCheckins!A1", mappedData);
        if (response.status === "success") {
            await updateDocsWithUpdatedInReport(docs);
            console.log(chalk.green(`${mappedData.length} EmailOrMobile checkins updated in report`));
        }
    }
    catch (e) {
        console.error(e);
    }
};
const generateReport = async () => {
    try {
        await updateReportForAbhyasiIdCheckins();
        await updateReportForEmailOrMobileCheckins();
    }
    catch (error) {
        console.log('Error in generateReport', error);
    }
};
exports.generateReport = generateReport;
//# sourceMappingURL=index.js.map