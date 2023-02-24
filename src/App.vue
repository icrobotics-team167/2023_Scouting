<template>
  <v-app id="inspire">
    <v-bottom-navigation horizontal>
      <v-btn prepend-icon="mdi-form-select" title="Form" value="form" to="/"></v-btn>
      <v-btn prepend-icon="mdi-form-select" title="Pit Form" value="form" to="/pitscouting"></v-btn>
      <v-btn prepend-icon="mdi-robot" title="Auto Data" value="auto" to="/auto"></v-btn>
      <v-btn prepend-icon="mdi-human-queue" title="Teleop Data" value="teleop" to="/teleop"></v-btn>
      <v-btn prepend-icon="mdi-chart-bar" title="Graphs" value="graph" to="/graph"></v-btn>
      <v-btn prepend-icon="mdi-format-list-numbered" title="Duluth Team List" value="team" to="/duluth/teams"></v-btn>
      <v-btn prepend-icon="mdi-format-list-numbered" title="Iowa Team List" value="team" to="/iowa/teams"></v-btn>
    </v-bottom-navigation>
    <v-app-bar>
      <v-toolbar-title>2023 Scouting App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer class="d-flex flex-column">
      <div class="px-4 py-2 bg-black text-center w-100">
        {{ new Date().getFullYear() }} — <strong>167 Iowa City Robotics</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({ drawer: null }),
}
</script>