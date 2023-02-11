import Vue from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';
import FormComponent from './components/FormComponent.vue';
import AutoTable from './components/AutoTable.vue';
import TeleopTable from './components/TeleopTable.vue';
import GraphComponent from './components/GraphComponent.vue';
import './plugins/element.js'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: FormComponent },
  { path: '/auto', component: AutoTable },
  { path: '/teleop', component: TeleopTable },
  { path: '/graphs', component: GraphComponent }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
