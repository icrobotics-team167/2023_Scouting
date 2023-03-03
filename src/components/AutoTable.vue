<template>
  <v-alert color="info" text="Table is loading." v-if="isLoading"></v-alert>

  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Scout Name</th>
        <th class="text-left">Team Number</th>
        <th class="text-left">Auto: Moved</th>
        <th class="text-left">Auto: Cones Scored High</th>
        <th class="text-left">Auto: Cones Scored Mid</th>
        <th class="text-left">Auto: Cones Scored Low</th>
        <th class="text-left">Auto: Boxes Scored High</th>
        <th class="text-left">Auto: Boxes Scored Mid</th>
        <th class="text-left">Auto: Boxes Scored Low</th>
        <th class="text-left">Auto: Dock/Engage</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.name">
        <td>{{ item.scout }}</td>
        <td>{{ item.number }}</td>
        <td>{{ item.moveAuto }}</td>
        <td>{{ item.autoHighCone }}</td>
        <td>{{ item.autoMidCone }}</td>
        <td>{{ item.autoLowCone }}</td>
        <td>{{ item.autoHighBox }}</td>
        <td>{{ item.autoMidBox }}</td>
        <td>{{ item.autoLowBox }}</td>
        <td>{{ item.engageStatusAuto }}</td>
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
  name: "AutoTable",
  data: () => ({
    isLoading: true,
    tableData,
  }),
  methods: {
    async getMatchData(db) {
      const matchDataCol = collection(db, "matchData");
      const matchDataSnapshot = await getDocs(matchDataCol);
      const matchDataList = matchDataSnapshot.docs.map((doc) => doc.data());
      return matchDataList;
    },
  },
  beforeMount() {
    tableData = new Array();
    this.getMatchData(db).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tableData.push({
          id: doc.id,
          scout: doc.scout,
          number: doc.number,
          moveAuto: doc.moveAuto,
          autoHighBox: doc.autoHighBox,
          autoMidBox: doc.autoMidBox,
          autoLowBox: doc.autoLowBox,
          autoHighCone: doc.autoHighCone,
          autoMidCone: doc.autoMidCone,
          autoLowCone: doc.autoLowCone,
          engageStatusAuto: doc.engageStatusAuto,
          teleopHighCone: doc.teleopHighCone,
          teleopMidCone: doc.teleopMidCone,
          teleopLowCone: doc.teleopLowCone,
          teleopHighBox: doc.teleopHighBox,
          teleopMidBox: doc.teleopMidBox,
          teleopLowBox: doc.teleopLowBox,
          engageStatus: doc.engageStatus,
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
