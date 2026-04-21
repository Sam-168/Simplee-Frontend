import { createRouter, createWebHistory } from 'vue-router'

import PublicBookingView from '../views/PublicBookingView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import SetupView from '../views/SetupView.vue'
import DashboardView from '../views/DashboardView.vue'
import BookingDetailView from '../views/BookingDetailView.vue'
import CustomersView from '../views/CustomersView.vue'
import ShareLinkView from '../views/ShareLinkView.vue'
import SettingsView from '../views/SettingsView.vue'
import LandingView from '../views/LandingView.vue'

const routes = [
  
  { path: '/welcome', component: LandingView },
  { path: '/book/:slug', component: PublicBookingView },
  { path: '/confirmation', component: ConfirmationView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignUpView },

  
  { path: '/setup', component: SetupView, meta: { requiresAuth: true } },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/booking/:id', component: BookingDetailView, meta: { requiresAuth: true } },
  { path: '/customers', component: CustomersView, meta: { requiresAuth: true } },
  { path: '/share', component: ShareLinkView, meta: { requiresAuth: true } },
  { path: '/settings', component: SettingsView, meta: { requiresAuth: true } },

 
  { path: '/', redirect: '/welcome' },

  
  { path: '/:pathMatch(.*)*', redirect: '/welcome' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.meta.requiresAuth

  
  if (requiresAuth && !token) {
    return { path: '/login' }
  }

  //redirect to login if someone tries to hit an endpoint directly
  if (token && (to.path === '/dashboard' || to.path === '/signup' || to.path === '/setup')) {
    return { path: '/login' }
  }
})

export default router