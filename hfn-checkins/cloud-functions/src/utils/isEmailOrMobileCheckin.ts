import {QueryDocumentSnapshot} from "@google-cloud/firestore";
import {CheckinData, CheckinTypesEnum} from "@hfn-checkins/types";

export const isEmailOrMobileCheckin = (checkinSnapshot: QueryDocumentSnapshot<CheckinData>):boolean => {
  const checkinData = checkinSnapshot.data();
  if (checkinData && checkinData.type === CheckinTypesEnum.EmailOrMobile) {
    return true;
  }
  return false;
};
