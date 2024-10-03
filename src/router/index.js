import { createRouter, createWebHistory } from 'vue-router';
import Admin from '@/views/Admin.vue';

// Define the routes
const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;
