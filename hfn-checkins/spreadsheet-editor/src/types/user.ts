export enum CheckinTypesEnum {
  AbhyasiId = "AbhyasiId",
  EmailOrMobile = "EmailOrMobile",
}

type EmailOrMobileDetail =
  | { mobile: string }
  | { email: string }
  | { email: string; mobile: string };

export type CheckinEmailOrMobileUserDetails = {
  fullName: string;
  ageGroup: string;
  gender: "M" | "F" | "U";
  city: string;
  state: string;
  country: string;
} & EmailOrMobileDetail;

export interface IAbhyasiCheckinApiStoreData {
  abhyasiId: string;
  deviceId: string;
  timestamp: number;
  type: CheckinTypesEnum.AbhyasiId;
}

export type CheckinWithEmailOrMobileApiStoreData =
  CheckinEmailOrMobileUserDetails & {
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
  };

export type CheckinData =
  | IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData;
