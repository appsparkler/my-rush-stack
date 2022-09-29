import * as admin from 'firebase-admin';
const serviceAccount = require(`../../../creds-${process.env.NODE_ENV}`);

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.firestore().collection('checkins').where('type', "==", "AbhyasiId")
  .limit(10).get().then(docs => {
    docs.forEach(doc => {
      console.log(doc.data())
    })
  })
  .catch(err => {
    console.error('oops!!');
   }
  )
    ;