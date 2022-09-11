import {CheckinsAggregateData} from "@hfn-checkins/types";
import {
  aggregateDocRef,
} from "../firestore";

const defaultCheckinAggregateData:CheckinsAggregateData = {
  abhyasiIdCheckin: 0,
  checkinsWithEmail: 0,
  checkinsWithMobile: 0,
  emailOrMobileCheckin: 0,
  checkinsWithEmailAndMobile: 0,
  city: {},
  state: {},
  country: {},
  dataAppendedForPreviousCheckins: true,
  female: 0,
  male: 0,
  unspecified: 0,
};

export const ensureAggregateDocExists = async () => {
  const aggregateDoc = await aggregateDocRef.get();
  if (!aggregateDoc.exists) {
    await aggregateDoc.ref.create(defaultCheckinAggregateData);
  }
};
