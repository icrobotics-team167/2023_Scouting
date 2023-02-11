<template>
  <!-- eslint-disable -->

  <div>
    <h1>Match Data Input</h1>

    <v-form ref="form" :model="form" label-width="220px">
      <h2>Auto Data</h2>
      <v-model label="Team Number">
        <v-input v-model="form.number"></v-input>
      </v-model>
      <v-model label="Moved in Auto?">
        <v-input
          v-model="form.moveAuto"
          placeholder="1 for yes, 0 for no"
        ></v-input>
      </v-model>
      <v-model label="Times Scored High">
        <v-input v-model="form.autoHigh"></v-input>
      </v-model>
      <v-model label="Times Scored Mid">
        <v-input v-model="form.autoMid"></v-input>
      </v-model>
      <v-model label="Times Scored Low">
        <v-input v-model="form.autoLow"></v-input>
      </v-model>
      <v-model label="Engaged/Docked Auto">
        <v-input
          v-model="form.engageStatusAuto"
          placeholder="2 for docked, 1 for engaged, 0 for neither"
        ></v-input>
      </v-model>

      <h2>Teleop Data</h2>
      <v-model label="Times Scored High">
        <v-input v-model="form.teleopHigh"></v-input>
      </v-model>
      <v-model label="Times Scored Mid">
        <v-input v-model="form.teleopMid"></v-input>
      </v-model>
      <v-model label="Times Scored Low">
        <v-input v-model="form.teleopLow"></v-input>
      </v-model>
      <v-model label="Engaged/Docked Teleop">
        <v-input
          v-model="form.engageStatus"
          placeholder="2 for docked, 1 for engaged, 0 for neither"
        ></v-input>
      </v-model>
      <v-model label="Teleop: Parked">
        <v-input
          v-model="form.parkTeleop"
          placeholder="Did they score points for parking? 1 for yes, 0 for no"
        ></v-input>
      </v-model>
      <v-model label="Postgame: Number of Links Formed">
        <v-input v-model="form.numLinks"></v-input>
      </v-model>
      <v-model label="Postgame: Coopertition Bonus">
        <v-input
          v-model="form.coopBonus"
          placeholder="1 for if the team was a part of activating the coopertition bonus, 0 if they weren't (even if others on their team did)"
        ></v-input>
      </v-model>
      <v-model>
        <v-btn
          type="primary"
          @click="
            addMatchData(
              form.number,
              form.moveAuto,
              form.autoHigh,
              form.autoMid,
              form.autoLow,
              form.engageStatusAuto,
              form.teleopHigh,
              form.teleopMid,
              form.teleopLow,
              form.engageStatus,
              form.parkTeleop,
              form.numLinks,
              form.coopBonus
            )
          "
          >Add Match Data</v-btn
        >
      </v-model>
    </v-form>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
const db = firebase.firestore();
export default {
  name: "FormComponent",
  data() {
    return {
      form: {
        number: "",
        moveAuto: "",
        autoHigh: "",
        autoMid: "",
        autoLow: "",
        engageStatusAuto: "",
        teleopHigh: "",
        teleopMid: "",
        teleopLow: "",
        engageStatus: "",
        parkTeleop: "",
        numLinks: "",
        coopBonus: "",
        matchData: [],
      },
    };
  },
  methods: {
    addMatchData(
      number,
      moveAuto,
      autoHigh,
      autoMid,
      autoLow,
      engageStatusAuto,
      teleopHigh,
      teleopMid,
      teleopLow,
      engageStatus,
      parkTeleop,
      numLinks,
      coopBonus
    ) {
      if (number != "") {
        db.collection("matchData")
          .add({
            number,
            moveAuto,
            autoHigh,
            autoMid,
            autoLow,
            engageStatusAuto,
            teleopHigh,
            teleopMid,
            teleopLow,
            engageStatus,
            parkTeleop,
            numLinks,
            coopBonus,
          })
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
          });
          this.form = {
            number: "",
            moveAuto: "",
            autoHigh: "",
            autoMid: "",
            autoLow: "",
            engageStatusAuto: "",
            teleopHigh: "",
            teleopMid: "",
            teleopLow: "",
            engageStatus: "",
            parkTeleop: "",
            numLinks: "",
            coopBonus: "",
            matchData: [],
          };
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
  mounted() {
    this.readmatchData();
  },
};
</script>
