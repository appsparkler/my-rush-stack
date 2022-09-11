import {
  CheckinsAggregateData,
  CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData, IAbhyasiCheckinApiStoreData,
} from "@hfn-checkins/types";
import {reduce} from "lodash/fp";

export const updateAggregateDocWithCheckin = (
    data: IAbhyasiCheckinApiStoreData | CheckinWithEmailOrMobileApiStoreData,
    aggregateData: CheckinsAggregateData
): CheckinsAggregateData => {
  if (data.type === CheckinTypesEnum.AbhyasiId) {
    return {
      ...aggregateData,
      abhyasiIdCheckin: aggregateData.abhyasiIdCheckin + 1,
      dataAppendedForPreviousCheckins: true,
    };
  }
  const upperCaseCity = data.city?.toUpperCase();
  const upperCaseState = data.state?.toUpperCase();
  const upperCaseCountry = data.country?.toUpperCase();
  return {
    ...aggregateData,
    emailOrMobileCheckin: aggregateData.emailOrMobileCheckin + 1,
    male: data.gender === "M" ? aggregateData.male + 1 : aggregateData.male,
    female:
      data.gender === "F" ? aggregateData.female + 1 : aggregateData.female,
    unspecified: data.gender === "U" ? aggregateData.unspecified + 1 :
      aggregateData.unspecified,
    city:
      upperCaseCity !== "undefined" && aggregateData.city[upperCaseCity] ?
        {
          ...aggregateData.city,
          [upperCaseCity]: aggregateData.city[upperCaseCity] + 1,
        } :
        {...aggregateData.city, [upperCaseCity]: 1},
    state:
      upperCaseState !== "undefined" && aggregateData.state[upperCaseState] ?
        {
          ...aggregateData.state,
          [upperCaseState]: aggregateData.state[upperCaseState] + 1,
        } :
        {...aggregateData.state, [upperCaseState]: 1},
    country:
      upperCaseCountry !== "undefined" &&
      aggregateData.country[upperCaseCountry] ?
        {
          ...aggregateData.country,
          [upperCaseCountry]: aggregateData.country[upperCaseCountry] + 1,
        } :
        {...aggregateData.country, [upperCaseCountry]: 1},
    checkinsWithEmail: (data as { email: string }).email ?
      aggregateData.checkinsWithEmail + 1 :
      aggregateData.checkinsWithEmail,
    checkinsWithMobile: (data as { mobile: string }).mobile ?
      aggregateData.checkinsWithMobile + 1 :
      aggregateData.checkinsWithMobile,
    dataAppendedForPreviousCheckins: true,
  };
};

const initialAggregateData: CheckinsAggregateData = {
  abhyasiIdCheckin: 0,
  emailOrMobileCheckin: 0,
  city: {},
  country: {},
  state: {},
  checkinsWithEmail: 0,
  checkinsWithMobile: 0,
  male: 0,
  female: 0,
  unspecified: 0,
  checkinsWithEmailAndMobile: 0,
  dataAppendedForPreviousCheckins: false,
};

export const reduceCheckinDocsToAggregateData = reduce<
  IAbhyasiCheckinApiStoreData | CheckinWithEmailOrMobileApiStoreData,
  CheckinsAggregateData
>((acc, doc) => {
  const aggregateData = updateAggregateDocWithCheckin(doc, acc);
  return aggregateData;
}, initialAggregateData);
