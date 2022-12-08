export interface ICheckinsAggregateData {
  emailOrMobileCheckin: number;
  abhyasiIdCheckin: number;
  city: Record<string, number>;
  state: Record<string, number>;
  country: Record<string, number>;
  checkinsWithEmail: number;
  checkinsWithMobile: number;
  checkinsWithEmailAndMobile: number;
  male: number;
  female: number;
  unspecified: number;
  dataAppendedForPreviousCheckins: boolean;
}

export type EmailOrMobileDeletedAggregateData = Pick<
  ICheckinsAggregateData,
  | "city"
  | "state"
  | "country"
  | "checkinsWithEmail"
  | "checkinsWithMobile"
  | "checkinsWithEmailAndMobile"
  | "emailOrMobileCheckin"
  | "unspecified"
  | "male"
  | "female"
>;
