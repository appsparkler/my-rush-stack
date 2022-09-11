import {
  CheckinsAggregateData,
} from "@hfn-checkins/types";
import {
  checkinsCollectionRef,
  aggregateDocRef,
} from "../firestore";


const updateAggregateDocForDeletedAbhyasiIdCheckin = async (
    numberOfCheckinsToRemove: number
) => {
  const aggregateDocData = (await aggregateDocRef.get()).data();
  if (aggregateDocData) {
    await aggregateDocRef.update({
      abhyasiIdCheckin: aggregateDocData.abhyasiIdCheckin - numberOfCheckinsToRemove,
    } as CheckinsAggregateData);
  }
};

// If AbhyasiId is already checked in,
// it removes the duplicate abhyasi-ids and updates the aggregation doc accordingly.
export const removeDuplicateAbhyasiIdCheckins = async (
    abhyasiId:string,
) => {
  const query = await checkinsCollectionRef.where(
      "abhyasiId", "==", abhyasiId);
  const querySnapshot = await query.get();
  if (querySnapshot.size > 1) {
    let index = 0;
    const deletePromises:Promise<FirebaseFirestore.WriteResult>[] = [];
    querySnapshot.forEach((doc) => {
      index += 1;
      if (index > 1) {
        deletePromises.push(doc.ref.delete());
      }
    });
    await Promise.all(deletePromises);
    const numberOfCheckinsToRemove = querySnapshot.size - 1;
    await updateAggregateDocForDeletedAbhyasiIdCheckin(numberOfCheckinsToRemove);
  }
};

