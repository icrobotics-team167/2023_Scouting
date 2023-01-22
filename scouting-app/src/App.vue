<template>
  <!-- eslint-disable -->

  <div>
    <h1>
      Auto Data Input
    </h1>

    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="Team Number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="Moved in Auto?">
        <el-input v-model="form.moveAuto" placeholder="1 for yes, 0 for no"></el-input>
      </el-form-item>
      <el-form-item label="Points Scored High">
        <el-input v-model="form.autoHigh"></el-input>
      </el-form-item>
      <el-form-item label="Points Scored Mid">
        <el-input v-model="form.autoMid"></el-input>
      </el-form-item>
      <el-form-item label="Points Scored Low">
        <el-input v-model="form.autoLow"></el-input>
      </el-form-item>
      <el-form-item label="Engaged/Docked Auto">
        <el-input v-model="form.engageStatusAuto" placeholder="2 for docked, 1 for engaged, 0 for neither"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMatchData(form.number, form.moveAuto, form.autoHigh, form.autoMid, form.autoLow, form.engageStatusAuto)">Add Auto Data</el-button>
      </el-form-item>
    </el-form>
    <h1>
      Auto Data
    </h1>
    <el-table :data="form.autoData" style="width: 100%;">
      <el-table-column label="Team Number" prop="number"> </el-table-column>
      <el-table-column label="Auto: Moved" prop="moveAuto"> </el-table-column>
      <el-table-column label="Auto: Scored High" prop="autoHigh"> </el-table-column>
      <el-table-column label="Auto: Scored Mid" prop="autoMid"> </el-table-column>
      <el-table-column label="Auto: Scored Low" prop="autoLow"> </el-table-column>
      <el-table-column label="Auto: Dock/Engage" prop="engageStatusAuto"> </el-table-column>

    </el-table>
    <h1>
      Teleop and Postgame Data
    </h1>
    <el-table :data="teleopData" style="width: 100%">
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
import firebase from "./firebaseInit";
const db = firebase.firestore();
export default {
  name:"app",
  data() {
    return {
      form: {
        number: '',
        moveAuto: '',
        autoHigh: '',
        autoMid: '',
        autoLow: '',
        engageStatusAuto: '',
        autoData: []
      }
    };
  },
  methods: {
    addMatchData(number, moveAuto, autoHigh, autoMid, autoLow, engageStatusAuto) {
      if (number != "") {
        db.collection("autoData")
          .add({number, moveAuto, autoHigh, autoMid, autoLow, engageStatusAuto })
          .then(() => {
            console.log("Document successfully written!");
            this.readAutoData();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        this.number = "";
      }
    },
    readAutoData() {
      
      this.form.autoData = [];
      
      db.collection("autoData")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.form.autoData.push({
              id: doc.id,
              number: doc.data().number,
              moveAuto: doc.data().moveAuto,
              autoHigh: doc.data().autoHigh,
              autoMid: doc.data().autoMid,
              autoLow: doc.data().autoLow,
              engageStatusAuto: doc.data().engageStatusAuto
            });
            
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    updateEmployee(id, number, date) {
      db.collection("autoData")
        .doc(id)
        .update({
          number: number,
          date: date,
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.readAutoData();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteEmployee(id) {
      db.collection("autoData")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.readAutoData();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted() {
    this.readAutoData();
  },
};
</script>