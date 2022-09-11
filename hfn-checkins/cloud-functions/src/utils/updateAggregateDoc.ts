import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {updateAggregateDocWithCheckin} from "./reduceCheckDocsToAggregateData";
import {
  appendCheckinDataForExistingDocs,
} from "./appendCheckinDataForExistingDocs";
import {checkinsCollectionRef} from "../firestore";
import {appendCheckinData} from "./appendCheckinData";
import {
  CheckinsAggregateData,
  CheckinWithEmailOrMobileApiStoreData,
  IAbhyasiCheckinApiStoreData,
} from "@hfn-checkins/types";

export async function updateAggregateDoc(
    checkinSnapshot: functions.firestore.QueryDocumentSnapshot,
    aggregateDocRef: admin.firestore.DocumentReference<CheckinsAggregateData>,
    aggregateDocSnapshot:
    admin.firestore.DocumentSnapshot<CheckinsAggregateData>
) {
  const currentCheckin = checkinSnapshot.data() as
    | IAbhyasiCheckinApiStoreData
    | CheckinWithEmailOrMobileApiStoreData;

  const aggregateData = aggregateDocSnapshot.data();
  if (!aggregateData?.dataAppendedForPreviousCheckins) {
    const checkinsCollection = await checkinsCollectionRef.get();
    const checkinDocs = checkinsCollection.docs.map(
        (checkinDoc) => checkinDoc.data()
    );
    await appendCheckinDataForExistingDocs(checkinDocs);
  } else {
    await appendCheckinData(currentCheckin);
  }
  if (aggregateData) {
    const aggregateDataWithCurrentCheckin = updateAggregateDocWithCheckin(
        currentCheckin,
        aggregateData
    );
    return aggregateDocRef.set(aggregateDataWithCurrentCheckin);
  }
  return undefined;
}
