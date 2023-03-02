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
          v-model="form.matchNumber"
          label="Match Number"
          type="number"
          required
        >
        </v-text-field>
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
              ><v-btn v-on:click="form.autoHighCone--"> - </v-btn>
              {{ form.autoHighCone + " High" }}
              <v-btn v-on:click="form.autoHighCone++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="form.autoMidCone--"> - </v-btn>
              {{ form.autoMidCone + " Mid" }}
              <v-btn v-on:click="form.autoMidCone++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="form.autoLowCone--"> - </v-btn>
              {{ form.autoLowCone + " Low" }}
              <v-btn v-on:click="form.autoLowCone++"> + </v-btn>
            </v-row>
          </v-container>
        </v-col>
        <v-col>
          <v-container>
            <v-row>
              <h3 class>BOXES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="form.autoHighBox--"> - </v-btn>
              {{ form.autoHighBox + " High" }}
              <v-btn v-on:click="form.autoHighBox++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="form.autoMidBox--"> - </v-btn>
              {{ form.autoMidBox + " Mid" }}
              <v-btn v-on:click="form.autoMidBox++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="form.autoLowBox--"> - </v-btn>
              {{ form.autoLowBox + " Low" }}
              <v-btn v-on:click="form.autoLowBox++"> + </v-btn>
            </v-row>
          </v-container>
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
        <v-checkbox v-model="form.moveAuto" label="Moved in Auto?"></v-checkbox>
      </v-row>
      <h1>Teleop Form</h1>
      <v-row>
        <v-col>
          <v-container>
            <v-row>
              <h3 class>CONES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="form.teleopHighCone--"> - </v-btn>
              {{ form.teleopHighCone + " High" }}
              <v-btn v-on:click="form.teleopHighCone++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="form.teleopMidCone--"> - </v-btn>
              {{ form.teleopMidCone + " Mid" }}
              <v-btn v-on:click="form.teleopMidCone++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="form.teleopLowCone--"> - </v-btn>
              {{ form.teleopLowCone + " Low" }}
              <v-btn v-on:click="form.teleopLowCone++"> + </v-btn>
            </v-row>
          </v-container>
        </v-col>
        <v-col>
          <v-container>
            <v-row>
              <h3 class>BOXES</h3>
            </v-row>
            <v-row justify="space-between"
              ><v-btn v-on:click="form.teleopHighBox--"> - </v-btn>
              {{ form.teleopHighBox + " High" }}
              <v-btn v-on:click="form.teleopHighBox++"> + </v-btn>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="space-between"
              ><v-btn v-on:click="form.teleopMidBox--"> - </v-btn>
              {{ form.teleopMidBox + " Mid" }}
              <v-btn v-on:click="form.teleopMidBox++"> + </v-btn></v-row
            >
          </v-container>
          <v-container>
            <v-row justify="space-between">
              <v-btn v-on:click="form.teleopLowBox--"> - </v-btn>
              {{ form.teleopLowBox + " Low" }}
              <v-btn v-on:click="form.teleopLowBox++"> + </v-btn>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-slider
        v-model="form.engageStatus"
        max="2"
        min="0"
        step="1"
        show-ticks="always"
        :ticks="tickLabels"
        tick-size="4"
      ></v-slider>
      <v-checkbox
        v-model="form.parkTeleop"
        label="Score for Parking?"
      ></v-checkbox>
      <v-text-field
        type="number"
        v-model="form.numLinks"
        label="Number of Links Formed"
        min="0"
      ></v-text-field>
      <v-checkbox
        v-model="form.coopBonus"
        label="Coopertition Bonus?"
      ></v-checkbox>
      <v-textarea
        v-model="form.otherNotes"
        label="Notes"
        auto-grow
      ></v-textarea>
      <v-btn @click="addMatchData(form)" block class="mt-2">Submit</v-btn>
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
    form: {
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
      matchData: [],
    },
    tickLabels: {
      0: "Not Engaged",
      1: "Engaged",
      2: "Docked",
    },
  }),
  methods: {
    addMatchData(form) {
      if (
        form.number == undefined ||
        form.matchNumber == undefined ||
        form.scout == undefined
      ) {
        this.isAlertVisible = true;
        window.scrollTo(0, 0);
        return;
      }
      let docId = "match-" + form.matchNumber + "-team-" + form.number;
      db.collection("matchData")
        .doc(docId)
        .set({ form })
        .then(() => {
          this.form = {
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
            matchData: [],
          };
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
