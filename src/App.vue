<template>
  <v-app>
    <v-app-bar app color="primary" dark> 2023 Scouting App </v-app-bar>
    <v-main>
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "./components/HomePage";

export default {
  name: "App",

  components: {
    HomePage,
  },

  data: () => ({
    //
  }),
};
</script>
