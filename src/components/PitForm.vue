<template>
  <v-form v-model="valid" ref="form">
    <v-alert
      v-if="isAlertVisible"
      text="Missing required information: Team number, scout name, isRookie, drive coach name, or drive base."
      color="error"
      closable
    ></v-alert>
    <v-alert
      v-if="isDocumentError"
      text="Problem submitting to Firebase. Please try again."
      color="error"
      closable
    ></v-alert>
    <v-container>
      <v-row>
        <h1>Pit Scouting</h1>
      </v-row>
      <v-col>
        <v-text-field
          v-model="form.number"
          label="Team Number"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.scout"
          label="Scout Name"
          required
        ></v-text-field>
        <v-checkbox v-model="form.rookie" label="Rookie team?"></v-checkbox>
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
      </v-col>
      <v-row>
        <h1>Auto Form</h1>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox
            v-model="form.moveAuto"
            label="Can move in Auto?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="form.autoCones"
            label="Can score cones in Auto?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="form.autoBoxes"
            label="Can score boxes in Auto?"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.autoHigh"
            label="Predicted High Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="form.autoMid"
            label="Predicted Mid Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="form.autoLow"
            label="Predicted Low Scores"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-slider
            v-model="form.engageStatusAuto"
            max="2"
            min="0"
            step="1"
            show-ticks="always"
            :ticks="tickLabels"
            tick-size="4"
          ></v-slider>
        </v-col>
      </v-row>
      <v-row>
        <h1>Teleop Form</h1>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox
            v-model="form.teleopCones"
            label="Can score cones in Teleop?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="form.teleopBoxes"
            label="Can score boxes in Teleop?"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.teleopHigh"
            label="Predicted High Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="form.teleopMid"
            label="Predicted Mid Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="form.teleopLow"
            label="Predicted Low Scores"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-slider
            v-model="form.engageStatus"
            max="2"
            min="0"
            step="1"
            show-ticks="always"
            :ticks="tickLabels"
            tick-size="4"
          ></v-slider>
          <v-text-field
            v-model="form.numLinks"
            label="Predicted Number of Links"
            min="0"
          ></v-text-field>
          <v-checkbox
            v-model="form.coopBonus"
            label="Aiming For Coopertition Bonus?"
          ></v-checkbox>
          <v-textarea
            v-model="form.otherNotes"
            label="Notes"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn @click="addPitData(form)" block class="mt-2">Submit</v-btn>
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
    isAlertVisible: false,
    isDocumentError: false,
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
    },
    tickLabels: {
      0: "Can't Engage",
      1: "Can Engage",
      2: "Can Dock",
    },
  }),
  methods: {
    addPitData(form) {
      if (
        form.number == undefined ||
        form.rookie == undefined ||
        form.coach == undefined ||
        form.driveBase == undefined ||
        form.scout == undefined
      ) {
        this.isAlertVisible = true;
        window.scrollTo(0, 0);
        return;
      }
      db.collection("pitData")
        .doc("team-" + form.number)
        .set({
          form,
        })
        .then(() => {
          console.log("Document successfully written!");
          window.scrollTo(0, 0);
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
            otherNotes: "",
            autoCones: "",
            autoBoxes: "",
            teleopCones: "",
            teleopBoxes: "",
          };
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          this.isDocumentError = true;
          window.scrollTo(0, 0);
        });
    },
  },
};
</script>
