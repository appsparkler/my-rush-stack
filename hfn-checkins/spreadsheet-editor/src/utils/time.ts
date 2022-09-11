export function getISTDateTimeFromTimestamp(timestamp: number): string[] {
  return new Date(timestamp)
    .toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
    .split(", ");
}
