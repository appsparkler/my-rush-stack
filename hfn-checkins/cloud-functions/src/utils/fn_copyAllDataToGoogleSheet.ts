import {logger} from "firebase-functions/v1";
import {checkinsCollectionRef} from "../firestore";
import {IRequestHandler} from "../types";
import {appendCheckinData, IResponse} from "./appendCheckinData";

class AppendDocPromises {
  private readonly promises: Promise<IResponse>[] = [];

  addPromise(promise: Promise<IResponse>) {
    this.promises.push(promise);
  }

  async execute() {
    const res = await Promise.all(this.promises);
    return res;
  }
}

export const copyAllDataToGoogleSheet: IRequestHandler = async (req, res) => {
  await checkinsCollectionRef.get().then((snapshot) => {
    const promises = new AppendDocPromises();
    snapshot.forEach((doc) => {
      const data = doc.data();
      promises.addPromise(appendCheckinData(data));
      console.log(doc.id, "=>", doc.data());
      logger.log(doc.id);
    });
    return promises;
  })
      .then(async (promises) => {
        const results = await promises.execute();
        const errorResults = results.map(
            (result) => result.status === "error" ? result : null
        );
        console.log(JSON.stringify(errorResults, null, 2));
      });
  res.json({message: "Hello from Firebase!"});
};

