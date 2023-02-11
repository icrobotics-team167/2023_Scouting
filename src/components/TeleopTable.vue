<template>
    <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">
         Team Number
        </th>
        <th class="text-left">
          Teleop: Scored High
        </th>
        <th class="text-left">
          Teleop: Scored Mid
        </th>
        <th class="text-left">
          Teleop: Scored Low
        </th>
        <th class="text-left">
          Teleop: Dock/Engage
        </th>
        <th class="text-left">
          Teleop: Parked
        </th>
        <th class="text-left">
          Post Game: # of Links
        </th>
        <th class="text-left">
          Post Game: CoOp Bonus
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in tableData"
        :key="item.name"
      >
        <td>{{ item.number }}</td>
        <td>{{ item.teleopHigh }}</td>
        <td>{{ item.teleopMid }}</td>
        <td>{{ item.teleopLow }}</td>
        <td>{{ item.engageStatus }}</td>
        <td>{{ item.parkTeleop }}</td>
        <td>{{ item.numLinks }}</td>
        <td>{{ item.coopBonus }}</td>
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
  });
});

export default {
    name: 'TeleopTable',
    data() {
    return {
      tableData
    };
  }
}
</script>