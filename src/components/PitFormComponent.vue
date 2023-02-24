<template>
  
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <h1 class>Auto Form</h1>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.number"
            label="Team Number"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.rookie"
            label="Rookie?"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.coach"
            label="Drive Coach Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.driveBase"
            label="Drive Base"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.moveAuto"
            label="Can Move in Auto? 1=Yes, 0=No"
          ></v-text-field>
          <v-text-field
            v-model="form.autoHigh"
            label="Predicted High Scores"
          ></v-text-field>
          <v-text-field
            v-model="form.autoMid"
            label="Predicted Mid Scores"
          ></v-text-field>
          <v-text-field
            v-model="form.autoLow"
            label="Predicted Low Scores"
          ></v-text-field>
          <v-text-field
            v-model="form.engageStatusAuto"
            label="Can Engage/Dock Auto? 2=Dock, 1=Engage, 0=Neither"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <h1>Teleop Form</h1>
      </v-row>
      <v-row>
        <v-col>
            <v-text-field
        v-model="form.teleopHigh"
        label="Predicted High Scores"
      ></v-text-field>
      <v-text-field
        v-model="form.teleopMid"
        label="Predicted Mid Scores"
      ></v-text-field>
      <v-text-field
        v-model="form.teleopLow"
        label="Predicted Low Scores"
      ></v-text-field>
      <v-text-field
        v-model="form.engageStatus"
        label="Can Dock/Engage? 2=Dock, 1=Engage, 0=Neither"
      ></v-text-field>
      <v-text-field
        v-model="form.parkTeleop"
        label="Can Park? 1=Yes, 0=No"
      ></v-text-field>
      <v-text-field
        v-model="form.numLinks"
        label="Predicted Number of Links"
      ></v-text-field>
      <v-text-field
        v-model="form.coopBonus"
        label="Aiming For Coopertition Bonus? 1=Yes, 0=No"
      ></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" @click="
            addMatchData(
              form.number,
              form.rookie,
              form.coach,
              form.driveBase,
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
            
          " block class="mt-2">Submit</v-btn>
    </v-container>
  </v-form>
</template>
<script>
import firebase from "../firebaseInit";

const db = firebase.firestore();

export default {
  name: "FormComponent",
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
      matchData: [],
    }
  }),
  methods: {
    addMatchData(
      number,
      rookie,
      coach,
      driveBase,
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
            rookie,
            coach,
            driveBase,
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
              rookie: doc.data().rookie,
              coach: doc.data().coach,
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
              parkTeleop: doc.data().parkTeleop,
              numLinks: doc.data().numLinks,
              coopBonus: doc.data().coopBonus,
            });
          });
          this.form = {
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
