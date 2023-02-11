import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import FormComponent from './components/FormComponent.vue';
import AutoTable from './components/AutoTable.vue';
import TeleopTable from './components/TeleopTable.vue';
import GraphComponent from './components/GraphComponent.vue';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: FormComponent },
  { path: '/auto', component: AutoTable },
  { path: '/teleop', component: TeleopTable },
  { path: '/graphs', component: GraphComponent }
];

const router = new VueRouter({
  routes: routes
})

Vue.use(VueRouter)

Vue.component("FormComponent", FormComponent)
Vue.component("AutoTable", AutoTable)
Vue.component("TeleopTable", TeleopTable)
Vue.component("GraphComponent", GraphComponent)

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')

