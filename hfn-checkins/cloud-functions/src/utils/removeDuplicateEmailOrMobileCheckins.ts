import {QueryDocumentSnapshot, QuerySnapshot} from "@google-cloud/firestore";
import {
  CheckinData,
  CheckinsAggregateData, CheckinTypesEnum, CheckinWithEmailOrMobileApiStoreData,
  EmailOrMobileDeletedAggregateData,
} from "@hfn-checkins/types";
import {
  checkinsCollectionRef,
  aggregateDocRef,
} from "../firestore";


const updateAggregateDocForDeletedEmailOrMobileCheckin = async (
    emailOrMobileDeletedAggregateData: EmailOrMobileDeletedAggregateData
) => {
  const aggregateDataSnapshot = await aggregateDocRef.get();
  const aggregateDataSnapshotData = aggregateDataSnapshot.data();
  if (aggregateDataSnapshotData) {
    const city = Object.entries(aggregateDataSnapshotData.city).reduce(
        (acc, [key, value]) => {
          if (emailOrMobileDeletedAggregateData.city[key]) {
            acc[key] = value - emailOrMobileDeletedAggregateData.city[key];
          } else {
            acc[key] = value;
          }
          return acc;
        }
        , aggregateDataSnapshotData.city);
    const state = Object.entries(aggregateDataSnapshotData.state).reduce(

        (acc, [key, value]) => {
          if (emailOrMobileDeletedAggregateData.state[key]) {
            acc[key] = value - emailOrMobileDeletedAggregateData.state[key];
          } else {
            acc[key] = value;
          }
          return acc;
        }
        , aggregateDataSnapshotData.state);
    const country = Object.entries(aggregateDataSnapshotData.country).reduce(
        (acc, [key, value]) => {
          if (emailOrMobileDeletedAggregateData.country[key]) {
            acc[key] = value - emailOrMobileDeletedAggregateData.country[key];
          } else {
            acc[key] = value;
          }
          return acc;
        }
        , aggregateDataSnapshotData.country);

    const emailOrMobileCheckin = aggregateDataSnapshotData.emailOrMobileCheckin - emailOrMobileDeletedAggregateData.emailOrMobileCheckin;

    const checkinsWithEmailAndMobile = aggregateDataSnapshotData.checkinsWithEmailAndMobile - emailOrMobileDeletedAggregateData.checkinsWithEmailAndMobile;
    const checkinsWithEmail = aggregateDataSnapshotData.checkinsWithEmail - emailOrMobileDeletedAggregateData.checkinsWithEmail;
    const checkinsWithMobile = aggregateDataSnapshotData.checkinsWithMobile - emailOrMobileDeletedAggregateData.checkinsWithMobile;

    const unspecified = aggregateDataSnapshotData.unspecified - emailOrMobileDeletedAggregateData.unspecified;
    const male = aggregateDataSnapshotData.male - emailOrMobileDeletedAggregateData.male;
    const female = aggregateDataSnapshotData.female - emailOrMobileDeletedAggregateData.female;

    const newAggregateData:CheckinsAggregateData = {
      ...aggregateDataSnapshotData,
      city, state, country,
      emailOrMobileCheckin,
      checkinsWithEmailAndMobile, checkinsWithEmail, checkinsWithMobile,
      unspecified, male, female,
    };
    await aggregateDocRef.update(newAggregateData);
  }
};

export const removeDuplicateEmailOrMobileCheckins = async (
    snapshot: QueryDocumentSnapshot<CheckinWithEmailOrMobileApiStoreData>
) => {
  const emailOrMobileCheckinData = snapshot.data();
  if (
    (emailOrMobileCheckinData as {email: string}).email &&
    (emailOrMobileCheckinData as {mobile:string}).mobile
  ) {
    const snapshotForNamePlusEmailAndNamePlusMobileMatches = await checkinsCollectionRef
        .where(
            "email",
            "==",
            (emailOrMobileCheckinData as {email:string}).email
        )
        .where(
            "mobile",
            "==",
            (emailOrMobileCheckinData as {mobile:string}).mobile
        )
        .where(
            "fullName",
            "==",
            emailOrMobileCheckinData.fullName
        )
        .where(
            "type",
            "==",
            CheckinTypesEnum.EmailOrMobile.toString()
        ).get();
    await processSnapshot(snapshot, snapshotForNamePlusEmailAndNamePlusMobileMatches);
  } else if ((emailOrMobileCheckinData as {email:string}).email) {
    const snapshotForNamePlusEmailMatches = await checkinsCollectionRef
        .where(
            "email",
            "==",
            (emailOrMobileCheckinData as {email:string}).email
        )
        .where(
            "fullName",
            "==",
            emailOrMobileCheckinData.fullName
        )
        .where(
            "type",
            "==",
            CheckinTypesEnum.EmailOrMobile.toString()
        ).get();
    await processSnapshot(snapshot, snapshotForNamePlusEmailMatches);
  } else if ((emailOrMobileCheckinData as {mobile:string}).mobile) {
    const snapshotForNamePlusMobileMatches = await checkinsCollectionRef
        .where(
            "mobile",
            "==",
            (emailOrMobileCheckinData as {mobile:string}).mobile
        )
        .where(
            "fullName",
            "==",
            emailOrMobileCheckinData.fullName
        )
        .where(
            "type",
            "==",
            CheckinTypesEnum.EmailOrMobile.toString()
        ).get();
    await processSnapshot(snapshot, snapshotForNamePlusMobileMatches);
  }
};

async function processSnapshot(
    snapshot: QueryDocumentSnapshot<CheckinWithEmailOrMobileApiStoreData>,
    snapshotForNamePlusEmailAndNamePlusMobileMatches: QuerySnapshot<CheckinData>
) {
  if (snapshotForNamePlusEmailAndNamePlusMobileMatches.size > 1) {
    const deletePromises: Promise<FirebaseFirestore.WriteResult>[] = [];
    const deletedData: EmailOrMobileDeletedAggregateData = {
      checkinsWithEmail: 0,
      checkinsWithMobile: 0,
      emailOrMobileCheckin: 0,
      city: {},
      state: {},
      country: {},
      male: 0,
      female: 0,
      unspecified: 0,
      checkinsWithEmailAndMobile: 0,
    };
    const handleEachDoc = (doc: QueryDocumentSnapshot<CheckinData>): void => {
      if (doc.id !== snapshot.id) {
        const data = doc.data() as CheckinWithEmailOrMobileApiStoreData;
        const hasEmail = (data as { email: string; }).email;
        const hasMobile = (data as { mobile: string; }).mobile;
        const hasEmailAndMobile = hasEmail && hasMobile;
        const hasOnlyEmail = hasEmail && !hasMobile;
        const hasOnlyMobile = !hasEmail && hasMobile;

        deletedData.emailOrMobileCheckin = deletedData.emailOrMobileCheckin + 1;

        deletedData.checkinsWithEmail = hasOnlyEmail ?
          deletedData.checkinsWithEmail + 1 : deletedData.checkinsWithEmail;
        deletedData.checkinsWithMobile = hasOnlyMobile ?
          deletedData.checkinsWithMobile + 1 : deletedData.checkinsWithMobile;
        deletedData.checkinsWithEmailAndMobile = hasEmailAndMobile ?
          deletedData.checkinsWithEmailAndMobile + 1 : deletedData.checkinsWithEmailAndMobile;

        deletedData.city = {
          ...deletedData.city,
          [data.city]: (deletedData.city[data.city] || 0) + 1,
        };
        deletedData.state = {
          ...deletedData.state,
          [data.state]: (deletedData.state[data.state] || 0) + 1,
        };
        deletedData.country = {
          ...deletedData.country,
          [data.country]: (deletedData.country[data.country] || 0) + 1,
        };

        deletedData.male = data.gender === "M" ? deletedData.male + 1 : deletedData.male;
        deletedData.female = data.gender === "F" ? deletedData.female + 1 : deletedData.female;
        deletedData.unspecified = data.gender === "U" ? deletedData.unspecified + 1 : deletedData.unspecified;

        deletePromises.push(doc.ref.delete());
      }
    };
    snapshotForNamePlusEmailAndNamePlusMobileMatches.forEach(handleEachDoc);
    await Promise.all(deletePromises);
    await updateAggregateDocForDeletedEmailOrMobileCheckin(deletedData);
  }
}

