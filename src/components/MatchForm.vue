<template>
  <v-form v-model="valid" ref="match_form">
    <v-alert
      v-if="isSuccessful"
      text="Form successfully submitted."
      color="info"
      closable
    ></v-alert>
    <v-alert
      v-if="isAlertVisible"
      text="Missing required information: Match number, team number, scout name."
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
        <h1>Match Scouting</h1>
      </v-row>
      <v-col>
        <v-text-field
          v-model.number="matchNumber"
          label="Match Number"
          type="number"
          required
          v-on:click="isSuccessful=false"
        >
        </v-text-field>
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
      </v-col>
      <v-row>
        <h1>Auto Form</h1>
      </v-row>
      <v-row>
        <v-col>
          <v-container>
            <v-row>
              <h3 class>CONES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="autoHighCone--"> - </v-btn>
              {{ autoHighCone + " High" }}
              <v-btn v-on:click="autoHighCone++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="autoMidCone--"> - </v-btn>
              {{ autoMidCone + " Mid" }}
              <v-btn v-on:click="autoMidCone++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="autoLowCone--"> - </v-btn>
              {{ autoLowCone + " Low" }}
              <v-btn v-on:click="autoLowCone++"> + </v-btn>
            </v-row>
          </v-container>
        </v-col>
        <v-col>
          <v-container>
            <v-row>
              <h3 class>CUBES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="autoHighCubes--"> - </v-btn>
              {{ autoHighCubes + " High" }}
              <v-btn v-on:click="autoHighCubes++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="autoMidCubes--"> - </v-btn>
              {{ autoMidCubes + " Mid" }}
              <v-btn v-on:click="autoMidCubes++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="autoLowCubes--"> - </v-btn>
              {{ autoLowCubes + " Low" }}
              <v-btn v-on:click="autoLowCubes++"> + </v-btn>
            </v-row>
          </v-container>
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
        <v-checkbox
          v-model="leaveCommunity"
          label="Left Community in Auto?"
        ></v-checkbox>
      </v-row>
      <h1>Teleop Form</h1>
      <v-row>
        <v-col>
          <v-container>
            <v-row>
              <h3 class>CONES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="teleopHighCone--"> - </v-btn>
              {{ teleopHighCone + " High" }}
              <v-btn v-on:click="teleopHighCone++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="teleopMidCone--"> - </v-btn>
              {{ teleopMidCone + " Mid" }}
              <v-btn v-on:click="teleopMidCone++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="teleopLowCone--"> - </v-btn>
              {{ teleopLowCone + " Low" }}
              <v-btn v-on:click="teleopLowCone++"> + </v-btn>
            </v-row>
          </v-container>
        </v-col>
        <v-col>
          <v-container>
            <v-row>
              <h3 class>CUBES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="teleopHighCubes--"> - </v-btn>
              {{ teleopHighCubes + " High" }}
              <v-btn v-on:click="teleopHighCubes++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="teleopMidCubes--"> - </v-btn>
              {{ teleopMidCubes + " Mid" }}
              <v-btn v-on:click="teleopMidCubes++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="teleopLowCubes--"> - </v-btn>
              {{ teleopLowCubes + " Low" }}
              <v-btn v-on:click="teleopLowCubes++"> + </v-btn>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
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
        v-model="parkInCommunity"
        label="Parked? (Ending game in Community, not on Charging Station)"
      ></v-checkbox>
      <v-textarea v-model="otherNotes" label="Notes" auto-grow></v-textarea>
      <v-btn
        @click="
          addMatchData(
            scoutName,
            number,
            matchNumber,
            leaveCommunity,
            autoHighCubes,
            autoMidCubes,
            autoLowCubes,
            autoHighCone,
            autoMidCone,
            autoLowCone,
            engageStatusAuto,
            teleopHighCone,
            teleopMidCone,
            teleopLowCone,
            teleopHighCubes,
            teleopMidCubes,
            teleopLowCubes,
            engageStatus,
            parkInCommunity,
            otherNotes
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
  name: "MatchForm",
  data: () => ({
    valid: false,
    isAlertVisible: false,
    isDocumentError: false,
    isSuccessful: false,
    scoutName: "",
    number: 0,
    matchNumber: 0,
    leaveCommunity: false,
    autoHighCubes: 0,
    autoMidCubes: 0,
    autoLowCubes: 0,
    autoHighCone: 0,
    autoMidCone: 0,
    autoLowCone: 0,
    engageStatusAuto: 0,
    teleopHighCone: 0,
    teleopMidCone: 0,
    teleopLowCone: 0,
    teleopHighCubes: 0,
    teleopMidCubes: 0,
    teleopLowCubes: 0,
    engageStatus: 0,
    parkInCommunity: false,
    otherNotes: "",
    tickLabels: {
      0: "Not Engaged",
      1: "Engaged",
      2: "Docked",
    },
  }),
  methods: {
    addMatchData(
      scoutName,
      number,
      matchNumber,
      leaveCommunity,
      autoHighCubes,
      autoMidCubes,
      autoLowCubes,
      autoHighCone,
      autoMidCone,
      autoLowCone,
      engageStatusAuto,
      teleopHighCone,
      teleopMidCone,
      teleopLowCone,
      teleopHighCubes,
      teleopMidCubes,
      teleopLowCubes,
      engageStatus,
      parkInCommunity,
      otherNotes
    ) {
      if (number == 0 || matchNumber == 0 || scoutName == undefined) {
        this.isAlertVisible = true;
        window.scrollTo(0, 0);
        return;
      }
      let docId = "match-" + matchNumber + "-team-" + number;
      try {
        set(ref(db, "iowa/match/" + docId), {
          scoutName: scoutName,
          number: number,
          matchNumber: matchNumber,
          leaveCommunity: leaveCommunity,
          autoHighCubes: autoHighCubes,
          autoMidCubes: autoMidCubes,
          autoLowCubes: autoLowCubes,
          autoHighCone: autoHighCone,
          autoMidCone: autoMidCone,
          autoLowCone: autoLowCone,
          engageStatusAuto: engageStatusAuto,
          teleopHighCubes: teleopHighCubes,
          teleopMidCubes: teleopMidCubes,
          teleopLowCubes: teleopLowCubes,
          teleopHighCone: teleopHighCone,
          teleopMidCone: teleopMidCone,
          teleopLowCone: teleopLowCone,
          engageStatus: engageStatus,
          parkInCommunity: parkInCommunity,
          otherNotes: otherNotes,
        });
        this.$refs.match_form.reset();
      } catch (error) {
        console.error("Error writing document: ", error);
        this.isDocumentError = true;
      }
      this.isSuccessful = !this.isDocumentError;
      window.scrollTo(0, 0);
    },
  },
};
</script>
