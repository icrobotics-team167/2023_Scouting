<template>
  <div>
    <h1>
      Teleop and Postgame Data
    </h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Team Number" prop="number"> </el-table-column>
      <el-table-column label="Teleop: Scored High" prop="teleopHigh"> </el-table-column>
      <el-table-column label="Teleop: Scored Mid" prop="teleopMid"> </el-table-column>
      <el-table-column label="Teleop: Scored Low" prop="teleopLow"> </el-table-column>
      <el-table-column label="Teleop: Dock/Engage" prop="engageStatus"> </el-table-column>
      <el-table-column label="Teleop: Parked" prop="parkTeleop"> </el-table-column>
      <el-table-column label="Postgame: # of Links" prop="numLinks"> </el-table-column>
      <el-table-column label="Postgame: Coop Bonus" prop="coopBonus"> </el-table-column>
    </el-table>
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