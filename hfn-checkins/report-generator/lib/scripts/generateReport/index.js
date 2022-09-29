"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.mapAbhyasiIdCheckinDataToCellValues = exports.getISTDateTimeFromTimestamp = void 0;
const firebase_app_1 = require("./firebase-app");
const types_1 = require("@hfn-checkins/types");
const fp_1 = require("lodash/fp");
const CHECKINS_COLLECTION_NAME = "checkins";
const fetchAbhyasiIdCheckinsNotUpdatedInReport = async () => {
    try {
        const db = firebase_app_1.app.firestore();
        const items = await db.collection('checkins')
            .where("type", "==", "AbhyasiId")
            .limit(10)
            .get();
        console.log({ items });
        return { docs: [], data: [] };
        // const checkinsCollection = db.collection(CHECKINS_COLLECTION_NAME) as FirebaseFirestore.CollectionReference<IAbhyasiCheckinApiStoreData>
        // const abhyasiIdCheckinsNotUpdatedInReport = (await db
        //   .collection('checkins')
        //   .where("type", "!=", "AbhyasiId")
        //   .where("updatedInReport", "==", false)
        //   .limit(10)
        //   .get()) as FirebaseFirestore.QuerySnapshot<IAbhyasiCheckinApiStoreData>;
        // console.log(abhyasiIdCheckinsNotUpdatedInReport.size);
        // const docsAndData = abhyasiIdCheckinsNotUpdatedInReport.docs.map((doc) => ({
        //   doc,
        //   data: doc.data() as IAbhyasiCheckinApiStoreData,
        // }));
        // return docsAndData.reduce(
        //   (acc, { doc, data }) => {
        //     return {
        //       docs: [...acc.docs, doc],
        //       data: [...acc.data, data],
        //     };
        //   },
        //   {
        //     docs: [] as AbhyasiIdCheckinDataSnapshot[],
        //     data: [] as IAbhyasiCheckinApiStoreData[],
        //   }
        // );
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
const updateReportForAbhyasiIdCheckins = async () => {
    try {
        // console.log('try to update report');
        // const { data } = await fetchAbhyasiIdCheckinsNotUpdatedInReport();
        // const formattedDataForSheet = mapAbhyasiIdCheckinDataToCellValues(data);
        // console.log({ formattedDataForSheet })
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