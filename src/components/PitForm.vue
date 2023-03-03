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
          v-model.number="number"
          label="Team Number"
          required
        ></v-text-field>
        <v-text-field
          v-model="scout"
          label="Scout Name"
          required
        ></v-text-field>
        <v-checkbox v-model="rookie" label="Rookie team?"></v-checkbox>
        <v-text-field
          v-model="coach"
          label="Drive Coach Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="driveBase"
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
            v-model="moveAuto"
            label="Can move in Auto?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="autoCones"
            label="Can score cones in Auto?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="autoBoxes"
            label="Can score boxes in Auto?"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="autoHigh"
            label="Predicted High Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="autoMid"
            label="Predicted Mid Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="autoLow"
            label="Predicted Low Scores"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-slider
            v-model="engageStatusAuto"
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
            v-model="teleopCones"
            label="Can score cones in Teleop?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="teleopBoxes"
            label="Can score boxes in Teleop?"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="teleopHigh"
            label="Predicted High Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="teleopMid"
            label="Predicted Mid Scores"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="teleopLow"
            label="Predicted Low Scores"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-slider
            v-model="engageStatus"
            max="2"
            min="0"
            step="1"
            show-ticks="always"
            :ticks="tickLabels"
            tick-size="4"
          ></v-slider>
          <v-text-field
            v-model="numLinks"
            label="Predicted Number of Links"
            min="0"
          ></v-text-field>
          <v-checkbox
            v-model="coopBonus"
            label="Aiming For Coopertition Bonus?"
          ></v-checkbox>
          <v-textarea
            v-model="otherNotes"
            label="Notes"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn
        @click="
          addPitData(
            number,
            rookie,
            scout,
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
            otherNotes,
            autoCones,
            autoBoxes,
            teleopCones,
            teleopBoxes
          )
        "
        block
        class="mt-2"
        >Submit</v-btn
      >
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
    number: 0,
    scout: "",
    rookie: false,
    coach: "",
    driveBase: "",
    moveAuto: false,
    autoHigh: 0,
    autoMid: 0,
    autoLow: 0,
    engageStatusAuto: 0,
    teleopHigh: 0,
    teleopMid: 0,
    teleopLow: 0,
    engageStatus: 0,
    parkTeleop: false,
    numLinks: 0,
    coopBonus: false,
    otherNotes: "",
    autoCones: 0,
    autoBoxes: 0,
    teleopCones: 0,
    teleopBoxes: 0,
    tickLabels: {
      0: "Can't Engage",
      1: "Can Engage",
      2: "Can Dock",
    },
  }),
  methods: {
    addPitData(
      number,
      rookie,
      coach,
      driveBase,
      scout,
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
      otherNotes,
      autoCones,
      autoBoxes,
      teleopCones,
      teleopBoxes
    ) {
      if (
        number == undefined ||
        rookie == undefined ||
        coach == undefined ||
        driveBase == undefined ||
        scout == undefined
      ) {
        this.isAlertVisible = true;
        window.scrollTo(0, 0);
        return;
      }
      let timestamp = Date.now();
      db.collection("pitData")
        .doc("team-" + number)
        .set({
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
          otherNotes,
          autoCones,
          autoBoxes,
          teleopCones,
          teleopBoxes,
          timestamp,
        })
        .then(() => {
          console.log("Document successfully written!");
          window.scrollTo(0, 0);
            number=0;
            rookie=false;
            coach= "";
            driveBase= "";
            moveAuto= false;
            autoHigh=0;
            autoMid=0;
            autoLow=0;
            engageStatusAuto=0;
            teleopHigh=0;
            teleopMid=0;
            teleopLow=0;
            engageStatus=0;
            parkTeleop=false;
            numLinks=0;
            coopBonus=false;
            otherNotes= "";
            autoCones=0;
            autoBoxes=0;
            teleopCones=0;
            teleopBoxes=0;
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
