<template>
    <v-footer
      :padless="padless"
    >
      <v-card
        flat
        tile
        width="100%"
        class="footer"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>167 Children of the Corn</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>
<script>

export default {
  name: "HomeFooter",
  data: () => ({
    icons: [
      'mdi-linkedin',
      'mdi-github',
      'mdi-email',
      'mdi-home',
    ],
    padless: false,
  })
}
</script>
<style>
.footer {
position: fixed;
left: 0;
bottom: 0;
width: 100%;
text-align: center;
}
</style>
