<template>
  <v-form v-model="valid" ref="form">
    <v-alert
      v-if="isAlertVisible"
      text="Missing required information: Match number, team number, scout name."
      color="error"
      closable
    ></v-alert>
    <v-container>
      <v-text-field
        v-model="form.matchNumber"
        label="Match Number"
        type="number"
        required
        :rules="requiredField"
      >
      </v-text-field>
      <v-text-field
        v-model="form.number"
        label="Team Number"
        required
        :rules="requiredField"
      ></v-text-field>
      <v-text-field
        v-model="form.scout"
        label="Scout Name"
        required
        :rules="requiredField"
      ></v-text-field>
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
      <v-btn
        @click="
          addMatchData(
            form.scout,
            form.number,
            form.matchNumber,
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
    requiredField: [
      (value) => {
        if (value) return true;
        return "This is a required field";
      },
    ],
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
      db.collection("matchData")
        .doc(docId)
        .set({
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
<style>
.cone-btn {
  color: plum !important;
}

.cube-btn {
  color: yellow;
}
</style>
