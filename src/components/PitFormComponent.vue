<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <h1 class>Pit Scouting</h1>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="form.number" label="Team Number" required></v-text-field>
          <v-text-field v-model="form.scout" label="Scout Name" required></v-text-field>
          <v-text-field v-model="form.coach" label="Drive Coach Name" required></v-text-field>
          <v-text-field v-model="form.driveBase" label="Drive Base" required></v-text-field>
          <v-checkbox v-model="form.rookie" label="Rookie?" required></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <h2 class>Auto Predictions</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox v-model="form.moveAuto" label="Will they move in auto?"></v-checkbox>
          <v-text-field type="number" v-model="form.autoHighCone" label="How many high cones can they score in auto?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.autoMidCone" label="How many mid cones can they score in auto?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.autoLowCone" label="How many low cones can they score in auto?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.autoHighBox" label="How many high boxes can they score in auto?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.autoMidBox" label="How many mid boxes can they score in auto?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.autoLowBox" label="How many low boxes can they score in auto?" min=0></v-text-field>
          <v-slider v-model="form.engageStatusAuto" label="Will they engage or dock in auto? 2 = Docked, 1 = Engaged, 0 = Neither"
            max=2 min=0 step=1></v-slider>
        </v-col>
      </v-row>
      <v-row>
        <h2>Teleop Predictions</h2>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field type="number" v-model="form.teleopHighCone" label="How many high cones can they score in teleop?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopMidCone" label="How many mid cones can they score in teleop?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopLowCone" label="How many low cones can they score in teleop?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopHighBox" label="How many high boxes can they score in teleop?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopMidBox" label="How many mid boxes can they score in teleop?" min=0></v-text-field>
          <v-text-field type="number" v-model="form.teleopLowBox" label="How many low boxes can they score in teleop?" min=0></v-text-field>
          <v-slider v-model="form.engageStatus" label="Will they dock or engage during teleop? 2 = Docked, 1 = Engaged, 0 = Neither" max=2 min=0
            step=1></v-slider>
          <v-checkbox v-model="form.coopBonus" label="Do they plan to go for the Coopertition Bonus? 1=Yes, 0=No"></v-checkbox>
          <v-textarea v-model="form.otherNotes" label="Other Notes" auto-grow></v-textarea>
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
  name: "FormComponent",
  data: () => ({
    valid: false,
    form: {
      scout: "",
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
    }
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
