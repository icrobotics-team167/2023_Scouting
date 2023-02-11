<template>
  <div>
    <h1>
      Teleop and Postgame Data
    </h1>
    <v-table :data="tableData" style="width: 100%">
      <td label="Team Number" prop="number"> </td>
      <td label="Teleop: Scored High" prop="teleopHigh"> </td>
      <td label="Teleop: Scored Mid" prop="teleopMid"> </td>
      <td label="Teleop: Scored Low" prop="teleopLow"> </td>
      <td label="Teleop: Dock/Engage" prop="engageStatus"> </td>
      <td label="Teleop: Parked" prop="parkTeleop"> </td>
      <td label="Postgame: # of Links" prop="numLinks"> </td>
      <td label="Postgame: Coop Bonus" prop="coopBonus"> </td>
    </v-table>
  </div>
</template>
<script>

import firebase from "../firebaseInit";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(firebase);

async function getmatchData(db) {
  const matchDataCol = collection(db, 'matchData');
  const matchDataSnapshot = await getDocs(matchDataCol);
  const matchDataList = matchDataSnapshot.docs.map(doc => doc.data());
  return matchDataList;
}

let tableData = [];

getmatchData(db).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    tableData.push({
      id: doc.id,
      number: doc.number,
      moveAuto: doc.moveAuto,
      autoHigh: doc.autoHigh,
      autoMid: doc.autoMid,
      autoLow: doc.autoLow,
      engageStatusAuto: doc.engageStatusAuto,
      teleopHigh: doc.teleopHigh,
      teleopMid: doc.teleopMid,
      teleopLow: doc.teleopLow,
      engageStatus: doc.engageStatus,
      parkTeleop: doc.parkTeleop,
      numLinks: doc.numLinks,
      coopBonus: doc.coopBonus,
    });
    
  })
  
})


export default {

  name: 'TeleopTable',
  data() {
    return {
      tableData
    };
  }

}
</script>