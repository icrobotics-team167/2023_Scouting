<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-toolbar-title>2023 Scouting App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-bottom-navigation horizontal mode="shift">
      <v-btn
        prepend-icon="mdi-form-select"
        title="Match Form"
        value="match"
        :to="{ name: 'MatchForm' }"
      >
        <span>Match Form</span>
      </v-btn>
      <v-btn
        prepend-icon="mdi-information"
        title="Pit Form"
        value="pit"
        :to="{ name: 'PitForm' }"
        ><span>Pit Form</span></v-btn
      >
      <!-- <v-btn
        prepend-icon="mdi-format-list-bulleted"
        title="Pit Table"
        value="table"
        :to="{ name: 'PitTable' }"
        ><span>Pit Table</span></v-btn
      >
      <v-btn
        prepend-icon="mdi-robot"
        title="Auto Data"
        value="auto"
        :to="{ name: 'AutoTable' }"
        ><span>Auto Table</span></v-btn
      >
      <v-btn
        prepend-icon="mdi-human-queue"
        title="Teleop Data"
        value="teleop"
        :to="{ name: 'TeleopTable' }"
        ><span>Teleop Table</span></v-btn
      > -->
      <v-btn
        prepend-icon="mdi-format-list-bulleted"
        title="Team List"
        value="team"
        :to="{ name: 'TeamList' }"
        ><span>Team List</span></v-btn
      >
    </v-bottom-navigation>
    <v-footer class="d-flex flex-column">
      <div class="px-4 py-2 bg-black text-center w-100">
        {{ new Date().getFullYear() }} — <strong>167 Iowa City Robotics</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: "App"
};
</script>
