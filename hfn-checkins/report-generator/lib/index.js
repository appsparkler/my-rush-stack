"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_app_1 = require("./firebase-app");
const init_1 = require("./scripts/init");
(0, init_1.init)();
firebase_app_1.app.firestore()
    .collection('checkins')
    .get()
    .then((snapshot) => {
    console.log(snapshot.docs.map((doc) => doc.data()));
});
//# sourceMappingURL=index.js.map