<template>
  <v-alert color="info" text="Table is loading." v-if="isLoading"></v-alert>

  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Scout Name</th>
        <th class="text-left">Team Number</th>
        <th class="text-left">Left Community</th>
        <th class="text-left">Cones Scored High</th>
        <th class="text-left"> Cones Scored Mid</th>
        <th class="text-left"> Cones Scored Low</th>
        <th class="text-left"> Cubes Scored High</th>
        <th class="text-left"> Cubes Scored Mid</th>
        <th class="text-left"> Cubes Scored Low</th>
        <th class="text-left"> Dock/Engage</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.name">
        <td>{{ item.scout }}</td>
        <td>{{ item.number }}</td>
        <td>{{ item.leftCommunity }}</td>
        <td>{{ item.HighCone }}</td>
        <td>{{ item.autoMidCone }}</td>
        <td>{{ item.autoLowCone }}</td>
        <td>{{ item.autoHighCubes }}</td>
        <td>{{ item.autoMidCubes }}</td>
        <td>{{ item.autoLowCubes }}</td>
        <td>{{ item.engageStatusAuto }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import { getDatabase, ref, query, limitToLast } from "firebase/database";
import firebaseApp from "../firebaseInit";

const db = getDatabase(firebaseApp);

let tableData = [];

export default {
  name: "AutoTable",
  data: () => ({
    isLoading: true,
    tableData,
  }),
  methods: {
    async getMatchData(db) {
      return query(ref(db, 'iowa/match/'), limitToLast(200));
    },
  },
  beforeMount() {
    tableData = new Array();
    this.getMatchData(db).then((querySnapshot) => {
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        tableData.push({
          id: doc.id,
          scoutName: doc.scoutName,
          number: doc.number,
          matchNumber: doc.matchNumber,
          leaveCommunity: doc.leaveCommunity,
          autoHighCubes: doc.autoHighCubes,
          autoMidCubes: doc.autoMidCubes,
          autoLowCubes: doc.autoLowCubes,
          autoHighCone: doc.autoHighCone,
          autoMidCone: doc.autoMidCone,
          autoLowCone: doc.autoLowCone,
          engageStatusAuto: doc.engageStatusAuto,
          otherNotes: doc.otherNotes,
        });
      });
    });
    this.isLoading = false;
  },
};
</script>
