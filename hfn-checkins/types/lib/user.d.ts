export declare enum CheckinTypesEnum {
    AbhyasiId = "AbhyasiId",
    EmailOrMobile = "EmailOrMobile"
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
} & EmailOrMobileDetail;
export interface IAbhyasiCheckinApiStoreData {
    abhyasiId: string;
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.AbhyasiId;
    updatedInReport: boolean;
}
export declare type CheckinWithEmailOrMobileApiStoreData = CheckinEmailOrMobileUserDetails & {
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
    updatedInReport: boolean;
};
export declare type CheckinData = IAbhyasiCheckinApiStoreData | CheckinWithEmailOrMobileApiStoreData;
export {};
//# sourceMappingURL=user.d.ts.map