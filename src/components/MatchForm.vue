<template>
  <v-form v-model="valid" ref="form">
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
        >
        </v-text-field>
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
              <h3 class>BOXES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="autoHighBox--"> - </v-btn>
              {{ autoHighBox + " High" }}
              <v-btn v-on:click="autoHighBox++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="autoMidBox--"> - </v-btn>
              {{ autoMidBox + " Mid" }}
              <v-btn v-on:click="autoMidBox++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="autoLowBox--"> - </v-btn>
              {{ autoLowBox + " Low" }}
              <v-btn v-on:click="autoLowBox++"> + </v-btn>
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
        <v-checkbox v-model="moveAuto" label="Moved in Auto?"></v-checkbox>
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
              <h3 class>BOXES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="teleopHighBox--"> - </v-btn>
              {{ teleopHighBox + " High" }}
              <v-btn v-on:click="teleopHighBox++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="teleopMidBox--"> - </v-btn>
              {{ teleopMidBox + " Mid" }}
              <v-btn v-on:click="teleopMidBox++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="teleopLowBox--"> - </v-btn>
              {{ teleopLowBox + " Low" }}
              <v-btn v-on:click="teleopLowBox++"> + </v-btn>
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
      <v-checkbox v-model="parkTeleop" label="Score for Parking?"></v-checkbox>
      <v-text-field
        type="number"
        v-model="numLinks"
        label="Number of Links Formed"
        min="0"
      ></v-text-field>
      <v-checkbox v-model="coopBonus" label="Coopertition Bonus?"></v-checkbox>
      <v-textarea v-model="otherNotes" label="Notes" auto-grow></v-textarea>
      <v-btn
        @click="
          addMatchData(
            scout,
            number,
            matchNumber,
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
  name: "MatchForm",
  data: () => ({
    valid: false,
    isAlertVisible: false,
    isDocumentError: false,
    scout: "",
    number: "",
    matchNumber: 0,
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
    tickLabels: {
      0: "Not Engaged",
      1: "Engaged",
      2: "Docked",
    },
  }),
  methods: {
    addMatchData(
      scout,
      number,
      matchNumber,
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
      if (
        number == undefined ||
        matchNumber == undefined ||
        scout == undefined
      ) {
        this.isAlertVisible = true;
        window.scrollTo(0, 0);
        return;
      }
      let docId = "match-" + matchNumber + "-team-" + number;
      let timestamp = Date.now();
      db.collection("matchData")
        .doc(docId)
        .set({
          scout,
          number,
          matchNumber,
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
          timestamp,
        })
        .then(() => {
          scout = "";
          number = "";
          matchNumber = 0;
          moveAuto = "";
          autoHighBox = 0;
          autoMidBox = 0;
          autoLowBox = 0;
          autoHighCone = 0;
          autoMidCone = 0;
          autoLowCone = 0;
          engageStatusAuto = 0;
          teleopHighCone = 0;
          teleopMidCone = 0;
          teleopLowCone = 0;
          teleopHighBox = 0;
          teleopMidBox = 0;
          teleopLowBox = 0;
          engageStatus = 0;
          parkTeleop = 0;
          numLinks = 0;
          coopBonus = 0;
          otherNotes = "";
          window.scrollTo(0, 0);
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
