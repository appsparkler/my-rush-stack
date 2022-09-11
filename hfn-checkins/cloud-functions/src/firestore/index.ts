import {CheckinData, CheckinsAggregateData} from "@hfn-checkins/types";
import * as admin from "firebase-admin";
import {env} from "../utils";

admin.initializeApp();

export const checkinsCollectionRef = admin
    .firestore()
    // eslint-disable-next-line max-len
    .collection(`checkins-${env?.NODE_ENV}`) as admin.firestore.CollectionReference<CheckinData>;

export const aggregateDocRef =
    admin
        .firestore()
        .collection("aggregations")
        // eslint-disable-next-line max-len
        .doc("checkins") as admin.firestore.DocumentReference<CheckinsAggregateData>;

const nodeEnv = String(env?.NODE_ENV);

export const checkinsDocumentPath = `/checkins-${nodeEnv}/{documentId}`;
