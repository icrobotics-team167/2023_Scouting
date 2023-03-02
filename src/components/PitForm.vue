<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <h1 class>Pit Scouting</h1>
      </v-row>
      <v-col>
        <v-text-field v-model="form.number" label="Team Number" required></v-text-field>
        <v-text-field v-model="form.scout" label="Scout Name" required></v-text-field>
        <v-text-field v-model="form.rookie" label="Rookie?" required></v-text-field>
        <v-text-field v-model="form.coach" label="Drive Coach Name" required></v-text-field>
        <v-text-field v-model="form.driveBase" label="Drive Base" required></v-text-field>
      </v-col>
      <v-row>
        <h2 class>Auto Info</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox v-model="form.moveAuto" label="Can move in Auto?"></v-checkbox>
          <v-checkbox v-model="form.autoCones" label="Can score cones in Auto?"></v-checkbox>
          <v-checkbox v-model="form.autoBoxes" label="Can score boxes in Auto?"></v-checkbox>
          <v-text-field v-model="form.autoHigh" label="Predicted High Scores"></v-text-field>
          <v-text-field v-model="form.autoMid" label="Predicted Mid Scores"></v-text-field>
          <v-text-field v-model="form.autoLow" label="Predicted Low Scores"></v-text-field>
          <v-slider v-model="form.engageStatusAuto" max=2 min=0 step=1 show-ticks="always" :ticks="tickLabels"
            tick-size="4"></v-slider>
        </v-col>
      </v-row>
      <v-row>
        <h2>Teleop Info</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox v-model="form.teleopCones" label="Can score cones in Teleop?"></v-checkbox>
          <v-checkbox v-model="form.teleopBoxes" label="Can score boxes in Teleop?"></v-checkbox>
          <v-text-field v-model="form.teleopHigh" label="Predicted High Scores"></v-text-field>
          <v-text-field v-model="form.teleopMid" label="Predicted Mid Scores"></v-text-field>
          <v-text-field v-model="form.teleopLow" label="Predicted Low Scores"></v-text-field>
          <v-slider v-model="form.engageStatus" max=2 min=0 step=1 show-ticks="always" :ticks="tickLabels"
            tick-size="4"></v-slider>
          <v-text-field v-model="form.numLinks" label="Predicted Number of Links"></v-text-field>
          <v-checkbox v-model="form.coopBonus" label="Aiming For Coopertition Bonus?"></v-checkbox>
          <v-textarea v-model="form.otherNotes" label="Notes" auto-grow></v-textarea>
        </v-col>
      </v-row>
      <v-btn type="submit" @click="
        addPitData(
          form.number,
          form.rookie,
          form.coach,
          form.driveBase,
          form.moveAuto,
          form.autoHigh,
          form.autoMid,
          form.autoLow,
          form.engageStatusAuto,
          form.autoCones,
          form.autoBoxes,
          form.teleopCones,
          form.teleopBoxes,
          form.teleopHigh,
          form.teleopMid,
          form.teleopLow,
          form.engageStatus,
          form.numLinks,
          form.coopBonus,
          form.otherNotes
        )

      " block class="mt-2">Submit</v-btn>
    </v-container>
  </v-form>
</template>
<script>
import firebase from "../firebaseInit";

const db = firebase.firestore();

export default {
  name: "PitForm",
  data: () => ({
    valid: false,
    form: {
      number: "",
      rookie: "",
      coach: "",
      driveBase: "",
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
      otherNotes: "",
      autoCones: "",
      autoBoxes: "",
      teleopCones: "",
      teleopBoxes: "",
      PitData: [],
    },
    tickLabels: {
      0: "Can't Engage",
      1: 'Can Engage',
      2: 'Can Dock'
    },
  }),
  methods: {
    addPitData(
      number,
      rookie,
      coach,
      scout,
      driveBase,
      moveAuto,
      autoHigh,
      autoMid,
      autoLow,
      engageStatusAuto,
      teleopHigh,
      teleopMid,
      teleopLow,
      autoCones,
      autoBoxes,
      teleopCones,
      teleopBoxes,
      engageStatus,
      parkTeleop,
      numLinks,
      coopBonus,
      otherNotes
    ) {
      if (number != "") {
        db.collection("PitData")
          .add({
            number,
            rookie,
            coach,
            scout,
            driveBase,
            moveAuto,
            autoHigh,
            autoMid,
            autoLow,
            engageStatusAuto,
            teleopHigh,
            teleopMid,
            teleopLow,
            autoCones,
            autoBoxes,
            teleopCones,
            teleopBoxes,
            engageStatus,
            parkTeleop,
            numLinks,
            coopBonus,
            otherNotes
          })
          .then(() => {
            console.log("Document successfully written!");
            this.readPitData();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        this.number = "";
      }
    },
    readPitData() {
      this.form.PitData = [];

      db.collection("PitData")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.form.PitData.push({
              id: doc.id,
              number: doc.data().number,
              rookie: doc.data().rookie,
              coach: doc.data().coach,
              scout: doc.data().scout,
              driveBase: doc.data().driveBase,
              moveAuto: doc.data().moveAuto,
              autoHigh: doc.data().autoHigh,
              autoMid: doc.data().autoMid,
              autoLow: doc.data().autoLow,
              engageStatusAuto: doc.data().engageStatusAuto,
              teleopHigh: doc.data().teleopHigh,
              teleopMid: doc.data().teleopMid,
              teleopLow: doc.data().teleopLow,
              engageStatus: doc.data().engageStatus,
              autoCones: doc.data().autoCones,
              autoBoxes: doc.data().autoBoxes,
              teleopCones: doc.data().teleopCones,
              teleopBoxes: doc.data().teleopBoxes,
              parkTeleop: doc.data().parkTeleop,
              numLinks: doc.data().numLinks,
              coopBonus: doc.data().coopBonus,
              otherNotes: doc.data().otherNotes
            });
          });
          this.form = {
            number: "",
            rookie: "",
            coach: "",
            scout: "",
            driveBase: "",
            moveAuto: "",
            autoHigh: "",
            autoMid: "",
            autoLow: "",
            engageStatusAuto: "",
            teleopHigh: "",
            teleopMid: "",
            teleopLow: "",
            autoCones: "",
            autoBoxes: "",
            teleopCones: "",
            teleopBoxes: "",
            engageStatus: "",
            parkTeleop: "",
            numLinks: "",
            coopBonus: "",
            otherNotes: "",
            PitData: [],
          };
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
  mounted() {
    this.readPitData();
  },
};
</script>
