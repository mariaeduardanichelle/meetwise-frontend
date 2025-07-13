import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import EventosPage from '../components/EventRegisterPage.vue'

const routes = [
  { path: '/', redirect: '/register' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/eventos', component: EventosPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
