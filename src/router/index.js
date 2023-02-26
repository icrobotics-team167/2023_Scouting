import { createWebHistory, createRouter } from "vue-router";

const MatchFrom = () => import('../components/MatchForm.vue')
const PitForm = () => import('../components/PitForm.vue')
const AutoTable = () => import('../components/AutoTable.vue')
const TeleopTable = () => import('../components/TeleopTable.vue')
const TeamList = () => import('../components/TeamList.vue')

const routes = [
    { path: '/', component: MatchFrom, name: 'MatchForm'},
    { path: '/pitscouting', component: PitForm, name: 'PitForm'},
    { path: '/auto', component: AutoTable, name: 'AutoTable'},
    { path: '/teleop', component: TeleopTable, name: 'TeleopTable' },
    { path: '/teams', component: TeamList, name: 'TeamList', title: 'Team List'},
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;