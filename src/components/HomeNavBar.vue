<template>
    <v-app-bar
      app
      color="white"
      flat
    >
    <v-tabs
      bg-color="primary"
    >
      <v-tab value="one" to="/form">Item One</v-tab>
      <v-tab value="two" to="/auto">Item Two</v-tab>
      <v-tab value="three" to="/teleop">Item Three</v-tab>
    </v-tabs>
    </v-app-bar>
</template>
<script>
  export default {
    name: "HomeNavBar"
  }
</script>