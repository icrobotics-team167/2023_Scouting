<template>
    <div>
      <h1>
      Auto Data
    </h1>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="Team Number" prop="number"> </el-table-column>
      <el-table-column label="Auto: Moved" prop="moveAuto"> </el-table-column>
      <el-table-column label="Auto: Scored High" prop="autoHigh"> </el-table-column>
      <el-table-column label="Auto: Scored Mid" prop="autoMid"> </el-table-column>
      <el-table-column label="Auto: Scored Low" prop="autoLow"> </el-table-column>
      <el-table-column label="Auto: Dock/Engage" prop="engageStatusAuto"> </el-table-column> 

    </el-table>
  </div>
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

  name: 'autoTable',
  data() {
    return {
      tableData
    };
  }

}
</script>