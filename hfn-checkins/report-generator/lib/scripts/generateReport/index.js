"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = void 0;
const firebase_app_1 = require("./firebase-app");
const generateReport = () => {
    firebase_app_1.app
        .firestore()
        .collection("checkins")
        .where("type", "!=", "AbhyasiId")
        .where("updatedInReport", "==", true)
        .get()
        .then(async (snapshot) => {
        console.log(snapshot.size);
        const promises = snapshot.docs.map(async (doc) => {
            console.log(doc.data());
            const res = await doc.ref.update({ updatedInReport: false });
            return res;
        });
        const results = await Promise.all(promises);
        console.log(results.length);
    });
};
exports.generateReport = generateReport;
//# sourceMappingURL=index.js.map