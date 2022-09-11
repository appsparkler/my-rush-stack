import {QueryDocumentSnapshot} from "@google-cloud/firestore";
import {CheckinsAggregateData, CheckinWithEmailOrMobileApiStoreData} from "@hfn-checkins/types";
import {aggregateDocRef} from "../firestore";

export const updateAggregationsForEmailOrMobileCheckins = async (
    emailOrMobileCheckinSnapshot: QueryDocumentSnapshot<CheckinWithEmailOrMobileApiStoreData>
) => {
  const emailOrMobileCheckinData = emailOrMobileCheckinSnapshot.data();
  const currentAggregateData = (await aggregateDocRef.get()).data();
  if (!currentAggregateData) return;
  const hasMobile = (emailOrMobileCheckinData as { mobile: string; }).mobile;
  const hasEmail = (emailOrMobileCheckinData as { email: string; }).email;
  const hasEmailAndMobile = hasEmail && hasMobile;
  const hasOnlyMobile = !hasEmail && hasMobile;
  const hasOnlyEmail = hasEmail && !hasMobile;
  const updatedAggregateData:CheckinsAggregateData = {
    ...currentAggregateData,
    emailOrMobileCheckin: currentAggregateData.emailOrMobileCheckin + 1,

    checkinsWithEmailAndMobile: hasEmailAndMobile ?
      currentAggregateData.checkinsWithEmailAndMobile + 1 : currentAggregateData.checkinsWithEmailAndMobile,
    checkinsWithEmail: hasOnlyEmail ? currentAggregateData.checkinsWithEmail + 1 : currentAggregateData.checkinsWithEmail,
    checkinsWithMobile: hasOnlyMobile ? currentAggregateData.checkinsWithMobile + 1 : currentAggregateData.checkinsWithMobile,

    city: {
      ...currentAggregateData.city,
      [emailOrMobileCheckinData.city]: (currentAggregateData.city[emailOrMobileCheckinData.city] || 0) + 1,
    },
    state: {
      ...currentAggregateData.state,
      [emailOrMobileCheckinData.state]: (currentAggregateData.state[emailOrMobileCheckinData.state] || 0) + 1,
    },
    country: {
      ...currentAggregateData.country,
      [emailOrMobileCheckinData.country]: (currentAggregateData.country[emailOrMobileCheckinData.country] || 0) + 1,
    },

    female: emailOrMobileCheckinData.gender === "F" ? currentAggregateData.female + 1 : currentAggregateData.female,
    male: emailOrMobileCheckinData.gender === "M" ? currentAggregateData.male + 1 : currentAggregateData.male,
    unspecified: emailOrMobileCheckinData.gender === "U" ? currentAggregateData.unspecified + 1 : currentAggregateData.unspecified,
  };
  await aggregateDocRef.update(updatedAggregateData);
};
