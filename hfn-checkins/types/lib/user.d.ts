export declare enum CheckinTypesEnum {
    AbhyasiId = "AbhyasiId",
    EmailOrMobile = "EmailOrMobile",
    QR = "QR"
}
declare type EmailOrMobileDetail = {
    mobile: string;
} | {
    email: string;
} | {
    email: string;
    mobile: string;
};
export declare type GenderType = "M" | "F" | "U";
export declare type CheckinEmailOrMobileUserDetails = {
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
export declare type CheckinWithEmailOrMobileApiStoreData = CheckinEmailOrMobileUserDetails & {
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
    updatedInReport: boolean;
    dormAndBirthAllocation: string;
};
export declare type CheckinData = IAbhyasiCheckinApiStoreData | CheckinWithEmailOrMobileApiStoreData;
export interface IQRCheckinUser {
    regId: number;
    eventName: string;
    abhyasiId: string;
    pnr: string;
    name: string;
    dormPreference: string;
    birthPreference: string;
    dormAndBirthAllocation: string;
    type: CheckinTypesEnum;
}
export {};
//# sourceMappingURL=user.d.ts.map