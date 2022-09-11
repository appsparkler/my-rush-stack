export enum CheckinTypesEnum {
  AbhyasiId = "AbhyasiId",
  EmailOrMobile = "EmailOrMobile",
}

type EmailOrMobileDetail =
  | { mobile: string }
  | { email: string }
  | { email: string; mobile: string };

export type GenderType = "M" | "F" | "U";

export type CheckinEmailOrMobileUserDetails = {
  fullName: string;
  ageGroup: string;
  gender: GenderType;
  city: string;
  state: string;
  country: string;
} & EmailOrMobileDetail;

export interface IAbhyasiCheckinApiStoreData {
  abhyasiId: string;
  deviceId: string;
  timestamp: number;
  type: CheckinTypesEnum.AbhyasiId;
  updatedInReport: boolean;
}

export type CheckinWithEmailOrMobileApiStoreData =
  CheckinEmailOrMobileUserDetails & {
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
    updatedInReport: boolean;
  };

export type CheckinData =
  | IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData;
