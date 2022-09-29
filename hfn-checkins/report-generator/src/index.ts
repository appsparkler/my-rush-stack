import { app } from './firebase-app'
import { init } from './scripts/init';

init();

app.firestore()
  .collection('checkins')
  .get()
  .then((snapshot) => {
  console.log(snapshot.docs.map((doc) => doc.data()));
})
