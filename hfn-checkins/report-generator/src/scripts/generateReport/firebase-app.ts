import * as admin from 'firebase-admin';
const serviceAccount = require(`../../../creds-${process.env.NODE_ENV}`);

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
