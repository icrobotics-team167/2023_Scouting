<template>
  <v-form v-model="valid" ref="form">
    <v-container>
        <h1 class>Match Scouting</h1>
      <v-text-field v-model="form.number" label="Team Number" required></v-text-field>
      <v-text-field v-model="form.scout" label="Scout Name" required></v-text-field>
      <v-row>
        <h2 class>Auto Form</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox v-model="form.moveAuto" label="Moved in Auto?"></v-checkbox>
          <v-text-field type="number" v-model="form.autoHighCone" label="Times Scored High (cone)" min=0 value=0></v-text-field>
          <v-text-field type="number" v-model="form.autoMidCone" label="Times Scored Mid (cone)" min=0 value=0></v-text-field>
          <v-text-field type="number" v-model="form.autoLowCone" label="Times Scored Low (cone)" min=0  value=0></v-text-field>
          <v-text-field type="number" v-model="form.autoHighBox" label="Times Scored High (box)" min=0  value=0></v-text-field>
          <v-text-field type="number" v-model="form.autoMidBox" label="Times Scored Mid (box)" min=0  value=0></v-text-field>
          <v-text-field type="number" v-model="form.autoLowBox" label="Times Scored Low (box)" min=0 value = 0></v-text-field>
           <v-slider v-model="form.engageStatusAuto" max=2 min=0 step=1 show-ticks="always" :ticks="tickLabels" tick-size="4"></v-slider>
        </v-col>
      </v-row>
      <v-row>
        <h2>Teleop Form</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field type="number" v-model="form.teleopHighCone" label="Times Scored High (cone)" min=0 value=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopMidCone" label="Times Scored Mid (cone)" min=0 value=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopLowCone" label="Times Scored Low (cone)" min=0 value=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopHighBox" label="Times Scored High (box)" min=0 value=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopMidBox" label="Times Scored Mid (box)" min=0 value=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopLowBox" label="Times Scored Low (box)" min=0 value=0></v-text-field>
          <v-slider v-model="form.engageStatus" max=2 min=0 step=1 show-ticks="always" :ticks="tickLabels" tick-size="4"></v-slider>
          <v-checkbox v-model="form.parkTeleop" label="Score for Parking?"></v-checkbox>
          <v-text-field type="number" v-model="form.numLinks" label="Number of Links Formed"  value=0></v-text-field>
          <v-checkbox v-model="form.coopBonus" label="Coopertition Bonus?"></v-checkbox>
          <v-textarea v-model="form.otherNotes" label="Notes" auto-grow></v-textarea>
        </v-col>
      </v-row>
      <v-btn type="submit" @click="
        addMatchData(
          form.scout,
          form.number,
          form.moveAuto,
          form.autoHighBox,
          form.autoMidBox,
          form.autoLowBox,
          form.autoHighCone,
          form.autoMidCone,
          form.autoLowCone,
          form.engageStatusAuto,
          form.teleopHighCone,
          form.teleopMidCone,
          form.teleopLowCone,
          form.teleopHighBox,
          form.teleopMidBox,
          form.teleopLowBox,
          form.engageStatus,
          form.parkTeleop,
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
  name: "MatchForm",
  data: () => ({
    valid: false,
    form: {
      scout: "",
      number: "",
      moveAuto: "",
      autoHighBox: 0,
      autoMidBox: 0,
      autoLowBox: 0,
      autoHighCone: 0,
      autoMidCone: 0,
      autoLowCone: 0,
      engageStatusAuto: 0,
      teleopHighCone: 0,
      teleopMidCone: 0,
      teleopLowCone: 0,
      teleopHighBox: 0,
      teleopMidBox: 0,
      teleopLowBox: 0,
      engageStatus: 0,
      parkTeleop: 0,
      numLinks: 0,
      coopBonus: 0,
      otherNotes: "",
      matchData: [],
    },
    tickLabels: {
          0: 'Not Engaged',
          1: 'Engaged',
          2: 'Docked'
        },
  }),
  methods: {
    addMatchData(
      scout,
      number,
      moveAuto,
      autoHighBox,
      autoMidBox,
      autoLowBox,
      autoHighCone,
      autoMidCone,
      autoLowCone,
      engageStatusAuto,
      teleopHighCone,
      teleopMidCone,
      teleopLowCone,
      teleopHighBox,
      teleopMidBox,
      teleopLowBox,
      engageStatus,
      parkTeleop,
      numLinks,
      coopBonus,
      otherNotes
    ) {
      if (number != "") {
        db.collection("matchData")
          .add({
            scout,
            number,
            moveAuto,
            autoHighBox,
            autoMidBox,
            autoLowBox,
            autoHighCone,
            autoMidCone,
            autoLowCone,
            engageStatusAuto,
            teleopHighCone,
            teleopMidCone,
            teleopLowCone,
            teleopHighBox,
            teleopMidBox,
            teleopLowBox,
            engageStatus,
            parkTeleop,
            numLinks,
            coopBonus,
            otherNotes,
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
              scout: doc.data().scout,
              number: doc.data().number,
              moveAuto: doc.data().moveAuto,
              autoHighBox: doc.data().autoHighBox,
              autoMidBox: doc.data().autoMidBox,
              autoLowBox: doc.data().autoLowBox,
              autoHighCone: doc.data().autoHighCone,
              autoMidCone: doc.data().autoMidCone,
              autoLowCone: doc.data().autoLowCone,
              engageStatusAuto: doc.data().engageStatusAuto,
              teleopHighCone: doc.data().teleopHighCone,
              teleopMidCone: doc.data().teleopMidCone,
              teleopLowCone: doc.data().teleopLowCone,
              teleopHighBox: doc.data().teleopHighBox,
              teleopMidBox: doc.data().teleopMidBox,
              teleopLowBox: doc.data().teleopLowBox,
              engageStatus: doc.data().engageStatus,
              parkTeleop: doc.data().parkTeleop,
              numLinks: doc.data().numLinks,
              coopBonus: doc.data().coopBonus,
              otherNotes: doc.data().otherNotes,

            });
          });
          this.form = {
            number: "",
            moveAuto: "",
            autoHighBox: "",
            autoMidBox: "",
            autoLowBox: "",
            autoHighCone: "",
            autoMidCone: "",
            autoLowCone: "",
            engageStatusAuto: "",
            teleopHighCone: "",
            teleopMidCone: "",
            teleopLowCone: "",
            teleopHighBox: "",
            teleopMidBox: "",
            teleopLowBox: "",
            engageStatus: "",
            parkTeleop: "",
            numLinks: "",
            coopBonus: "",
            otherNotes: "",
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
