// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TorchRelay from '../views/TorchRelay.vue';
import AthletePage from '../views/AthletePage.vue';
import OlympicArchive from '@/views/OlympicArchive.vue';
import EventGuide from '@/views/EventGuide.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/torch-relay',
    name: 'TorchRelay',
    component: TorchRelay
  },
  {
    path: '/event-guide',
    name: 'EventGuide',
    component: EventGuide
  },
  {
    path: '/athlete-page',
    name: 'AthletePage',
    component: AthletePage
  },
  {
    path: '/olympic-archive',
    name: 'OlympicArchive',
    component: OlympicArchive
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
