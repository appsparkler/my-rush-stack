import {
  CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData,
  IAbhyasiCheckinApiStoreData,
} from "../types";

export const data: (
  | IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData
)[] = [
  {
    type: CheckinTypesEnum.AbhyasiId,
    abhyasiId: "INAAAE383",
    timestamp: 1659159509883,
    deviceId: "7f60d813-52fa-4465-bd96-4be7d71ab9ac",
  },
  {
    type: CheckinTypesEnum.EmailOrMobile,
    fullName: "Siddharth",
    ageGroup: "18-25",
    city: "Bangalore",
    country: "India",
    deviceId: "7f60d813-52fa-4465-bd96-4be7d71ab9ac",
    gender: "M",
    mobile: "+942828282",
    state: "Karnataka",
    timestamp: 1659160548954,
  },
];
