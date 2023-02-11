<template>
  <!-- eslint-disable -->

  <div>
    <h1>
      Match Data Input
    </h1>

    <el-form ref="form" :model="form" label-width="220px">
      <h2>Auto Data
        </h2>
      <el-form-item label="Team Number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="Moved in Auto?">
        <el-input v-model="form.moveAuto" placeholder="1 for yes, 0 for no"></el-input>
      </el-form-item>
      <el-form-item label="Times Scored High">
        <el-input v-model="form.autoHigh"></el-input>
      </el-form-item>
      <el-form-item label="Times Scored Mid">
        <el-input v-model="form.autoMid"></el-input>
      </el-form-item>
      <el-form-item label="Times Scored Low">
        <el-input v-model="form.autoLow"></el-input>
      </el-form-item>
      <el-form-item label="Engaged/Docked Auto">
        <el-input v-model="form.engageStatusAuto" placeholder="2 for docked, 1 for engaged, 0 for neither"></el-input>
      </el-form-item>
      
      <h2>
        Teleop Data
      </h2>
      <el-form-item label="Times Scored High">
        <el-input v-model="form.teleopHigh"></el-input>
      </el-form-item>
      <el-form-item label="Times Scored Mid">
        <el-input v-model="form.teleopMid"></el-input>
      </el-form-item>
      <el-form-item label="Times Scored Low">
        <el-input v-model="form.teleopLow"></el-input>
      </el-form-item>
      <el-form-item label="Engaged/Docked Teleop">
        <el-input v-model="form.engageStatus" placeholder="2 for docked, 1 for engaged, 0 for neither"></el-input>
      </el-form-item>
      <el-form-item label="Teleop: Parked">
        <el-input v-model="form.parkTeleop" placeholder="Did they score points for parking? 1 for yes, 0 for no"></el-input>
      </el-form-item>
      <el-form-item label="Postgame: Number of Links Formed">
        <el-input v-model="form.numLinks"></el-input>
      </el-form-item>
      <el-form-item label="Postgame: Coopertition Bonus">
        <el-input v-model="form.coopBonus" placeholder="1 for if the team was a part of activating the coopertition bonus, 0 if they weren't (even if others on their team did)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMatchData(form.number, form.moveAuto, form.autoHigh, form.autoMid, form.autoLow, form.engageStatusAuto, form.teleopHigh, form.teleopMid, form.teleopLow, form.engageStatus, form.parkTeleop, form.numLinks, form.coopBonus)">Add Match Data</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
const db = firebase.firestore();
export default {
  name: 'FormComponent',
  data() {
    return {
      form: {
        number: '',
        moveAuto: '',
        autoHigh: '',
        autoMid: '',
        autoLow: '',
        engageStatusAuto: '',
        teleopHigh: '',
        teleopMid: '',
        teleopLow: '',
        engageStatus: '',
        parkTeleop: '',
        numLinks: '',
        coopBonus: '',
        matchData: []
      }
    };
  },
  methods: {
    addMatchData(number, moveAuto, autoHigh, autoMid, autoLow, engageStatusAuto, teleopHigh, teleopMid, teleopLow, engageStatus, parkTeleop, numLinks, coopBonus) {
      if (number != "") {
        db.collection("matchData")
          .add({number, moveAuto, autoHigh, autoMid, autoLow, engageStatusAuto, teleopHigh, teleopMid, teleopLow, engageStatus, parkTeleop, numLinks, coopBonus})
          .then(() => {
            console.log("Document successfully written!");
            this.readmatchData();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        this.number = "";
      }
    },
    readmatchData() {
      
      this.form.matchData = [];
      
      db.collection("matchData")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.form.matchData.push({
              id: doc.id,
              number: doc.data().number,
              moveAuto: doc.data().moveAuto,
              autoHigh: doc.data().autoHigh,
              autoMid: doc.data().autoMid,
              autoLow: doc.data().autoLow,
              engageStatusAuto: doc.data().engageStatusAuto,
              teleopHigh: doc.data().teleopHigh,
              teleopMid: doc.data().teleopMid,
              teleopLow: doc.data().teleopLow,
              engageStatus: doc.data().engageStatus,
              parkTeleop: doc.data().parkTeleop,
              numLinks: doc.data().numLinks,
              coopBonus: doc.data().coopBonus,
            });
            
            //console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    updateEmployee(id, number, date) {
      db.collection("matchData")
        .doc(id)
        .update({
          number: number,
          date: date,
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.readmatchData();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteEmployee(id) {
      db.collection("matchData")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.readmatchData();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted() {
    this.readmatchData();
  },
};
</script>