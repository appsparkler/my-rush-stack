import { map } from "lodash/fp";
import { CheckinWithEmailOrMobileApiStoreData } from "../types";
import { getISTDateTimeFromTimestamp } from "./time";

interface IMapEmailOrMobileCheckinDataToCellValues {
  (data: CheckinWithEmailOrMobileApiStoreData[]): (string | undefined)[][];
}

const getGender = (gender: "M" | "F" | "U"): string => {
  switch (gender) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    case "U":
      return "Unspecified";
    default:
      return "Not Updated";
  }
};

const getValue = (email: string | undefined): string | undefined => email;

export const mapEmailOrMobileCheckinDataToCellValues: IMapEmailOrMobileCheckinDataToCellValues =
  map((data) => {
    const [date, time]: string[] = getISTDateTimeFromTimestamp(data.timestamp);

    const [reportDate, reportTime] = getISTDateTimeFromTimestamp(Date.now());

    return [
      reportDate,
      reportTime,
      date,
      time,
      data.fullName,
      getGender(data.gender),
      data.ageGroup,
      getValue((data as { mobile?: string }).mobile),
      getValue((data as { email?: string }).email),
      data.city,
      data.state,
      data.country,
    ];
  });
