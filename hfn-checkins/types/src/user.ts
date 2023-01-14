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
  dormAndBerthAllocation: string;
  eventName: string;
} & EmailOrMobileDetail;

export interface IAbhyasiCheckinApiStoreData {
  abhyasiId: string;
  deviceId: string;
  timestamp: number;
  type: CheckinTypesEnum.AbhyasiId;
  updatedInReport: boolean;
  dormAndBerthAllocation: string;
  eventName: string;
}

export type CheckinWithEmailOrMobileApiStoreData =
  CheckinEmailOrMobileUserDetails & {
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
    updatedInReport: boolean;
    dormAndBerthAllocation: string;
    eventName: string;
  };

export type ICheckinWIthQRApiStoreData = {
  deviceId: string;
  timestamp: number;
  regId: string;
  updatedInReport: false;
  eventName: string;
  abhyasiId: string;
  pnr: string;
  fullName: string;
  dormPreference: string;
  berthPreference: string;
  dormAndBerthAllocation: string;
  type: CheckinTypesEnum.QR;
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
  berthPreference: string;
  dormAndBerthAllocation: string;
  type: CheckinTypesEnum.QR;
}
