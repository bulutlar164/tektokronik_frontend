import { createApp } from 'vue'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


import { createRouter,createWebHistory} from 'vue-router'

import RouterTest from './views/RouterTest.vue';
import RouterTest2 from './views/RouterTest2.vue';
import Login from './views/Login.vue';
// Şevket Admin

const routes = [
    {path:"/",component:RouterTest},
    {path:"/Admin",component:RouterTest2},
    {path:"/Login",component:Login}
    //Sevket Admin
]

const router = createRouter({
        history:createWebHistory(),
        routes:routes
});

createApp(App).use(router).mount('#app')
