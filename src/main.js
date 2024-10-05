import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { createRouter, createWebHistory } from 'vue-router';

import RouterTest from './views/RouterTest.vue';
import Admin from "@/views/Admin.vue";
import Login from './views/Login.vue';
import User from './views/User.vue';
//Emir
//Sevket

const routes = [
    {path:"/",component:Login},
    {path:"/Admin",component:Admin},
    {path:"/Login",component:Login},
    {path:"/User",component:User}
    //Emir
    //Sevket
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

// Create and mount the Vue app with the router
createApp(App).use(router).mount('#app');
