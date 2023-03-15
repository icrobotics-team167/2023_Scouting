<template>
  <v-form v-model="valid" ref="pit_form">
    <v-alert
      v-if="isSuccessful"
      text="Form successfully submitted."
      color="info"
      closable
    ></v-alert>
    <v-alert
      v-if="isAlertVisible"
      text="Missing required information: Team number, scout name, rookie team, drive coach name, or drive base."
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
          type="number"
          required
          v-on:click="isSuccessful=false"
        ></v-text-field>
        <v-text-field
          v-model="scoutName"
          label="Scout Name"
          required
          v-on:click="isSuccessful=false"
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
          <v-checkbox v-model="leaveCommunity" label="Leave Community in Auto?"></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="autoCones"
            label="Score Cones in Auto?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="autoCubes"
            label="Score Cubes in Auto?"
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
            label="Score Cones in Teleop?"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="teleopCubes"
            label="Score Cubes in Teleop?"
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
          <v-checkbox
            v-model="coopBonus"
            label="Aiming For Coopertition Bonus?"
          ></v-checkbox>
          <v-textarea v-model="otherNotes" label="Notes" auto-grow></v-textarea>
        </v-col>
      </v-row>
      <v-btn
        @click="
          addPitData(
            number,
            rookie,
            scoutName,
            coach,
            driveBase,
            leaveCommunity,
            autoHigh,
            autoMid,
            autoLow,
            engageStatusAuto,
            teleopHigh,
            teleopMid,
            teleopLow,
            engageStatus,
            parkInCommunity,
            coopBonus,
            otherNotes,
            autoCones,
            autoCubes,
            teleopCones,
            teleopCubes
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
import { getDatabase, ref, set } from "firebase/database";
import firebaseApp from "../firebaseInit";

const db = getDatabase(firebaseApp);

export default {
  name: "PitForm",
  data: () => ({
    valid: false,
    isAlertVisible: false,
    isDocumentError: false,
    isSuccessful: false,
    number: 0,
    scoutName: "",
    rookie: false,
    coach: "",
    driveBase: "",
    leaveCommunity: false,
    autoHigh: 0,
    autoMid: 0,
    autoLow: 0,
    engageStatusAuto: 0,
    teleopHigh: 0,
    teleopMid: 0,
    teleopLow: 0,
    engageStatus: 0,
    parkInCommunity: false,
    coopBonus: false,
    otherNotes: "",
    autoCones: 0,
    autoCubes: 0,
    teleopCones: 0,
    teleopCubes: 0,
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
      scoutName,
      leaveCommunity,
      autoHigh,
      autoMid,
      autoLow,
      engageStatusAuto,
      teleopHigh,
      teleopMid,
      teleopLow,
      engageStatus,
      parkInCommunity,
      coopBonus,
      otherNotes,
      autoCones,
      autoCubes,
      teleopCones,
      teleopCubes
    ) {
      if (
        number == 0 ||
        rookie == undefined ||
        coach == undefined ||
        driveBase == undefined ||
        scoutName == undefined
      ) {
        this.isAlertVisible = true;
        window.scrollTo(0, 0);
        return;
      }
      let docId = "team-" + number;
      try {
        set(ref(db, "iowa/pit/" + docId), {
        number: number,
        rookie: rookie,
        coach: coach,
        driveBase: driveBase,
        scoutName: scoutName,
        leaveCommunity: leaveCommunity,
        autoHigh: autoHigh,
        autoMid: autoMid,
        autoLow: autoLow,
        engageStatusAuto: engageStatusAuto,
        teleopHigh: teleopHigh,
        teleopMid: teleopMid,
        teleopLow: teleopLow,
        engageStatus: engageStatus,
        parkInCommunity: parkInCommunity,
        coopBonus: coopBonus,
        otherNotes: otherNotes,
        autoCones: autoCones,
        autoCubes: autoCubes,
        teleopCones: teleopCones,
        teleopCubes: teleopCubes,
      })
      this.$refs.pit_form.reset();
      } catch(error){
        console.error("Error writing document: ", error);
          this.isDocumentError = true;
      }
      this.isSuccessful = !this.isDocumentError;
      window.scrollTo(0, 0);
    },
  },
};
</script>
