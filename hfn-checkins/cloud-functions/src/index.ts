import {QueryDocumentSnapshot} from "@google-cloud/firestore";
import {CheckinData, CheckinWithEmailOrMobileApiStoreData} from "@hfn-checkins/types";
import * as functions from "firebase-functions";
import {log} from "firebase-functions/logger";
import {
  aggregateDocRef,
  checkinsCollectionRef,
  checkinsDocumentPath,
} from "./firestore";
import {
  config,
  ensureAggregateDocExists,
  env,
  isAbhyasiIdCheckin,
  isEmailOrMobileCheckin,
  removeDuplicateAbhyasiIdCheckins,
  removeDuplicateEmailOrMobileCheckins,
  updateAggregateForAbhyasiIdCheckin,
  updateAggregationsForEmailOrMobileCheckins,
  updateReportWithAbhyasiIdCheckins,
  updateReportWithEmailOrMobileCheckins,
} from "./utils";
import {clearSpreadsheetRange} from "./utils/appendCheckinData/spreadsheet-utils";

exports.updateAggregate = functions.firestore
    .document(checkinsDocumentPath)
    .onCreate(async (snapshot) => {
      await ensureAggregateDocExists();
      if (isAbhyasiIdCheckin(snapshot)) {
        await updateAggregateForAbhyasiIdCheckin();
        await removeDuplicateAbhyasiIdCheckins(snapshot.data().abhyasiId);
      }
      if (isEmailOrMobileCheckin(snapshot as QueryDocumentSnapshot<CheckinData>)) {
        await updateAggregationsForEmailOrMobileCheckins(
          snapshot as QueryDocumentSnapshot<CheckinWithEmailOrMobileApiStoreData>
        );
        await removeDuplicateEmailOrMobileCheckins(
          snapshot as QueryDocumentSnapshot<CheckinWithEmailOrMobileApiStoreData>
        );
      }
    });

exports.refreshDatabase = functions.https.onRequest(async (res, resp) => {
  if (res.query.password === env.REFRESH_DATABASE_PASSWORD) {
    const checkinCollection = await checkinsCollectionRef.get();
    const deletePromises = checkinCollection.docs.map(
        async (doc) => doc.ref.delete()
    );
    await Promise.all(deletePromises);
    await clearSpreadsheetRange(
        env.SPREADSHEET_ID, config.tabs.clearAbhyasiIdRange
    );

    await aggregateDocRef.delete();
    await clearSpreadsheetRange(env.SPREADSHEET_ID, config.tabs.clearEmailOrMobileRange);
    resp.send("Database refreshed");
  } else {
    resp.send("Wrong password");
  }
});

exports.updateReport = functions.https.onRequest(async (req, resp) => {
  try {
    await updateReportWithAbhyasiIdCheckins();
    await updateReportWithEmailOrMobileCheckins();
    resp.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap demo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
      </head>
      <body>
        <div class="container">
          <h1>Report Updated</h1>
          <p>You can visit this link to access the report : 
        <p>You can visit this link to access the report : 
          <p>You can visit this link to access the report : 
            <a 
        <a 
            <a 
              href="https://docs.google.com/spreadsheets/d/${env.SPREADSHEET_ID}/edit?rtpof=true#gid=${env.REPORT_TAB_ID}"
            >
              https://docs.google.com/spreadsheets/d/${env.SPREADSHEET_ID}/edit?rtpof=true#gid=${env.REPORT_TAB_ID}
            </a>
          </p>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
      </body>
    </html>
  `);
  } catch (error) {
    resp.status(500).send(error);
  }
});

exports.util = functions.https.onRequest(async (req, res) => {
  if (req.params.password === env.REFRESH_DATABASE_PASSWORD) {
    log({
      env: env,
      checkinsDocumentPath,
    });
  }
  res.send("Please check the logs.");
});
