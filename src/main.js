import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');