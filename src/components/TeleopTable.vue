<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Scout Name</th>
        <th class="text-left">Team Number</th>
        <th class="text-left">Teleop: Cones Scored High</th>
        <th class="text-left">Teleop: Cones Scored Mid</th>
        <th class="text-left">Teleop: Cones Scored Low</th>
        <th class="text-left">Teleop: Boxes Scored High</th>
        <th class="text-left">Teleop: Boxes Scored Mid</th>
        <th class="text-left">Teleop: Boxes Scored Low</th>
        <th class="text-left">Teleop: Dock/Engage</th>
        <th class="text-left">Teleop: Parked</th>
        <th class="text-left">Post Game: # of Links</th>
        <th class="text-left">Post Game: CoOp Bonus</th>
        <th class="text-left" style="min-width: 240px">
          Post Game: Other Notes
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.name">
        <td>{{ item.scout }}</td>
        <td>{{ item.number }}</td>
        <td>{{ item.teleopHighCone }}</td>
        <td>{{ item.teleopMidCone }}</td>
        <td>{{ item.teleopLowCone }}</td>
        <td>{{ item.teleopHighBox }}</td>
        <td>{{ item.teleopMidBox }}</td>
        <td>{{ item.teleopLowBox }}</td>
        <td>{{ item.engageStatus }}</td>
        <td>{{ item.parkTeleop }}</td>
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
  name: "TeleopTable",
  data() {
    return {
      tableData,
    };
  },
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
