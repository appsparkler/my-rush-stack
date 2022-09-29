import { app } from './firebase-app'

export const generateReport = () => {
  app
    .firestore()
    .collection("checkins")
    .where("type", "!=", "AbhyasiId")
    .where("updatedInReport", "==", true)
    .get()
    .then(async (snapshot) => {
      console.log(snapshot.size)
      const promises = snapshot.docs.map(async (doc) => {
        console.log(doc.data());
        const res = await doc.ref.update({ updatedInReport: false });
        return res;
      });

      const results = await Promise.all(promises);
      console.log(results.length)
    });
}