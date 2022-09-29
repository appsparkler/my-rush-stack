"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.mapAbhyasiIdCheckinDataToCellValues = exports.getISTDateTimeFromTimestamp = void 0;
const firebase_app_1 = require("./firebase-app");
const types_1 = require("@hfn-checkins/types");
const fp_1 = require("lodash/fp");
const CHECKINS_COLLECTION_NAME = "checkins";
const NUMBER_OF_RECORDS = 1;
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
const updateReportForAbhyasiIdCheckins = async () => {
    try {
        const { data } = await fetchAbhyasiIdCheckinsNotUpdatedInReport();
        const formattedDataForSheet = (0, exports.mapAbhyasiIdCheckinDataToCellValues)(data);
        console.log({ formattedDataForSheet });
    }
    catch (error) {
        console.log('Error in updating report for abhyasiIdCheckins', error);
    }
};
const generateReport = async () => {
    await updateReportForAbhyasiIdCheckins();
};
exports.generateReport = generateReport;
//# sourceMappingURL=index.js.map