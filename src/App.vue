<template>
  <v-app id="inspire">
    <v-bottom-navigation
      horizontal
      >
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-form-select" title="Form" value="form" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-form-select" title="Pit Form" value="form" to="/pitscouting"></v-list-item>
          <v-list-item prepend-icon="mdi-robot" title="Auto Data" value="auto" to="/auto"></v-list-item>
          <v-list-item prepend-icon="mdi-human-queue" title="Teleop Data" value="teleop" to="/teleop"></v-list-item>
          <v-list-item prepend-icon="mdi-chart-bar" title="Graphs" value="graph" to="/graph"></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-format-list-numbered" title="Duluth Team List" value="team" to="/duluth/teams"></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-format-list-numbered" title="Iowa Team List" value="team" to="/iowa/teams"></v-list-item>
        </v-list>
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