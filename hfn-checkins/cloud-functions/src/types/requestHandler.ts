import * as functions from "firebase-functions";

export interface IRequestHandler {
    (
        req: functions.https.Request,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resp: functions.Response<any>
    ): void | Promise<void>
}
