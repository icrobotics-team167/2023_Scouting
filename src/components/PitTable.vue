<template>
  <v-alert color="info" text="Table is loading." v-if="isLoading"></v-alert>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Scout Name</th>
        <th class="text-left">Team Number</th>
        <th class="text-left">Drive Team Coach</th>
        <th class="text-left">Rookie?</th>
        <th class="text-left">Drive Base Type</th>
        <th class="text-left">Auto Movement?</th>
        <th class="text-left">Auto Cones?</th>
        <th class="text-left">Auto Boxes?</th>
        <th class="text-left">Auto: High Score</th>
        <th class="text-left">Auto: Mid Score</th>
        <th class="text-left">Auto: Low Score</th>
        <th class="text-left">Auto Engage Status 0-2</th>
        <th class="text-left">Teleop Cones?</th>
        <th class="text-left">Teleop Boxes?</th>
        <th class="text-left">Teleop: High Score</th>
        <th class="text-left">Teleop: Mid Score</th>
        <th class="text-left">Teleop: Low Score</th>
        <th class="text-left">Teleop Engage Status 0-2</th>
        <th class="text-left">Number of Links</th>
        <th class="text-left">Aiming for Coopertition Bonus?</th>
        <th class="text-left">Other Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.number">
        <td>{{ item.scout }}</td>
        <td>{{ item.number }}</td>
        <td>{{ item.coach }}</td>
        <td>{{ item.rookie }}</td>
        <td>{{ item.driveBase }}</td>
        <td>{{ item.moveAuto }}</td>
        <td>{{ item.autoCones }}</td>
        <td>{{ item.autoBoxes }}</td>
        <td>{{ item.autoHigh }}</td>
        <td>{{ item.autoMid }}</td>
        <td>{{ item.autoLow }}</td>
        <td>{{ item.engageStatusAuto }}</td>
        <td>{{ item.teleopCones }}</td>
        <td>{{ item.teleopBoxes }}</td>
        <td>{{ item.teleopHigh }}</td>
        <td>{{ item.teleopMid }}</td>
        <td>{{ item.teleopLow }}</td>
        <td>{{ item.engageStatus }}</td>
        <td>{{ item.numLinks }}</td>
        <td>{{ item.coopBonus }}</td>
        <td>{{ item.otherNotes }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import firebase from "../firebaseInit";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const db = getFirestore(firebase);

let tableData = [];

export default {
  name: "PitTable",
  data() {
    return {
      isLoading: true,
      tableData,
    };
  },
  methods: {
    async getPitData(db) {
      const pitDataCol = collection(db, "pitData");
      const pitDataSnapshot = await getDocs(pitDataCol);
      const pitDataList = pitDataSnapshot.docs.map((doc) => doc.data());
      return pitDataList;
    },
  },
  beforeMount() {
    tableData = new Array();
    this.getPitData(db).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tableData.push({
          id: doc.id,
          number: doc.number,
          rookie: doc.rookie,
          coach: doc.coach,
          scout: doc.scout,
          driveBase: doc.driveBase,
          moveAuto: doc.moveAuto,
          autoHigh: doc.autoHigh,
          autoMid: doc.autoMid,
          autoLow: doc.autoLow,
          engageStatusAuto: doc.engageStatusAuto,
          teleopHigh: doc.teleopHigh,
          teleopMid: doc.teleopMid,
          teleopLow: doc.teleopLow,
          engageStatus: doc.engageStatus,
          autoCones: doc.autoCones,
          autoBoxes: doc.autoBoxes,
          teleopCones: doc.teleopCones,
          teleopBoxes: doc.teleopBoxes,
          parkTeleop: doc.parkTeleop,
          numLinks: doc.numLinks,
          coopBonus: doc.coopBonus,
          otherNotes: doc.otherNotes,
        });
      });
    });
    this.isLoading = false;
  },
};
</script>
