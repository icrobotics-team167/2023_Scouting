<template>
  <v-app id="inspire">
    <HomeNavBar></HomeNavBar>
    <v-main>
    <FormComponent></FormComponent>
    </v-main>
    <HomeFooter></HomeFooter>
  </v-app>
</template>

<script>
import HomeFooter from './HomeFooter';
import HomeNavBar from './HomeNavBar.vue';
import FormComponent from './FormComponent.vue';

  export default {
    name: "HomePage",
    components: {
      HomeFooter,
      HomeNavBar,
      FormComponent
    },
    data: () => ({
    }),
  }
</script>