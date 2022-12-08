export enum CheckinTypesEnum {
  AbhyasiId = "AbhyasiId",
  EmailOrMobile = "EmailOrMobile",
  QR = "QR",
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
  dormAndBirthAllocation: string;
} & EmailOrMobileDetail;

export interface IAbhyasiCheckinApiStoreData {
  abhyasiId: string;
  deviceId: string;
  timestamp: number;
  type: CheckinTypesEnum.AbhyasiId;
  updatedInReport: boolean;
  dormAndBirthAllocation: string;
}

export type CheckinWithEmailOrMobileApiStoreData =
  CheckinEmailOrMobileUserDetails & {
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
    updatedInReport: boolean;
    dormAndBirthAllocation: string;
  };

export type CheckinData =
  | IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData;

export interface IQRCheckinUser {
  regId: string;
  eventName: string;
  abhyasiId: string;
  pnr: string;
  fullName: string;
  dormPreference: string;
  birthPreference: string;
  dormAndBirthAllocation: string;
  type: CheckinTypesEnum;
}
