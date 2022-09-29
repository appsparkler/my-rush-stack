import { CheckinWithEmailOrMobileApiStoreData, IAbhyasiCheckinApiStoreData } from '@hfn-checkins/types';
interface IMapEmailOrMobileCheckinDataToCellValues {
    (data: CheckinWithEmailOrMobileApiStoreData[]): (string | undefined)[][];
}
export declare function getISTDateTimeFromTimestamp(timestamp: number): string[];
export declare const mapAbhyasiIdCheckinDataToCellValues: (data: IAbhyasiCheckinApiStoreData[]) => string[][];
export declare const mapEmailOrMobileCheckinDataToCellValues: IMapEmailOrMobileCheckinDataToCellValues;
export declare const generateReport: () => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map