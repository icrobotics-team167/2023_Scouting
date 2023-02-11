import { createApp } from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import AutoTable from './components/AutoTable.vue'
import FormComponent from './components/FormComponent.vue'
import GraphComponent from './components/GraphComponent.vue'
import TeleopTable from './components/TeleopTable.vue'

loadFonts()

const routes = [
  { path: '/', component: FormComponent},
  { path: '/auto', component: AutoTable},
  { path: '/teleop', component: TeleopTable },
  { path: '/graph', component: GraphComponent },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');