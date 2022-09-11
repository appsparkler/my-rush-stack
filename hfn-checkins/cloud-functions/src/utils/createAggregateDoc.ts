import {CheckinData, CheckinWithEmailOrMobileApiStoreData,
  IAbhyasiCheckinApiStoreData} from "@hfn-checkins/types";
import {aggregateDocRef, checkinsCollectionRef} from "../firestore";

import {
  appendCheckinDataForExistingDocs,
} from "./appendCheckinDataForExistingDocs";
import {
  reduceCheckinDocsToAggregateData,
} from "./reduceCheckDocsToAggregateData";

export async function createAggregateDoc() {
  const checkinsCollection = await checkinsCollectionRef.get();
  if (checkinsCollection.empty) return;
  const docs = checkinsCollection.docs.map(
      (doc) => doc.data()
  ) as CheckinData[];
  await appendCheckinDataForExistingDocs(docs);
  const aggregateData = reduceCheckinDocsToAggregateData(
    docs as unknown as (
      | CheckinWithEmailOrMobileApiStoreData
      | IAbhyasiCheckinApiStoreData
    )[]
  );
  return aggregateDocRef.create(aggregateData);
}
