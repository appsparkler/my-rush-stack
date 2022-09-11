import {
  CheckinsAggregateData,
  IAbhyasiCheckinApiStoreData,
  CheckinWithEmailOrMobileApiStoreData,
  CheckinTypesEnum,
} from "@hfn-checkins/types";
import {firestore} from "firebase-functions";
import {aggregateDocRef} from "../firestore";

export const isAbhyasiIdCheckin = (
    checkinSnapshot: firestore
    .QueryDocumentSnapshot
) => {
  const checkinData = checkinSnapshot.data() as IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData;
  if (checkinData.type === CheckinTypesEnum.AbhyasiId) {
    return true;
  }
  return false;
};

export const updateAggregateForAbhyasiIdCheckin = async () => {
  const aggregateDoc = await aggregateDocRef.get();
  if (aggregateDoc.exists) {
    const currentData = aggregateDoc.data() as CheckinsAggregateData;
    aggregateDocRef.update({
      abhyasiIdCheckin: currentData.abhyasiIdCheckin + 1,
    } as Partial<CheckinsAggregateData>);
  }
};
