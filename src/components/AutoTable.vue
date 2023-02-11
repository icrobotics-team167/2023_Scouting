<template>
    <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">
         Team Number
        </th>
        <th class="text-left">
          Auto: Moved
        </th>
        <th class="text-left">
          Auto: Scored High
        </th>
        <th class="text-left">
          Auto: Scored Mid
        </th>
        <th class="text-left">
          Auto: Scored Low
        </th>
        <th class="text-left">
          Auto: Dock/Engage
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in tableData"
        :key="item.name"
      >
        <td>{{ item.number }}</td>
        <td>{{ item.moveAuto }}</td>
        <td>{{ item.autoHigh }}</td>
        <td>{{ item.autoMid }}</td>
        <td>{{ item.autoLow }}</td>
        <td>{{ item.engageStatusAuto }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import firebase from "../firebaseInit";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(firebase);

async function getMatchData(db) {
  const matchDataCol = collection(db, 'matchData');
  const matchDataSnapshot = await getDocs(matchDataCol);
  const matchDataList = matchDataSnapshot.docs.map(doc => doc.data());
  return matchDataList;
}

let tableData = [];

getMatchData(db).then((querySnapshot) => {
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
    name: 'AutoTable',
    data() {
    return {
      tableData
    };
  }
  }
</script>