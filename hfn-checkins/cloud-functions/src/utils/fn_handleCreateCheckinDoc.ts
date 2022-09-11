import * as functions from "firebase-functions";
import {aggregateDocRef} from "../firestore";
import {createAggregateDoc} from "./createAggregateDoc";
import {updateAggregateDoc} from "./updateAggregateDoc";

export async function handleCreateCheckinDoc(
    checkinData: functions.firestore.QueryDocumentSnapshot,
): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
  functions.logger.info("Starting handleCreateCheckinDoc");
  const aggregateDoc = await aggregateDocRef.get();
  if (aggregateDoc.exists) {
    return updateAggregateDoc(checkinData, aggregateDocRef, aggregateDoc);
  } else {
    return createAggregateDoc();
  }
}
