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

const routes = [
  { path: '/book/:slug', component: PublicBookingView },
  { path: '/confirmation', component: ConfirmationView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignUpView },
  { path: '/setup', component: SetupView },
  { path: '/dashboard', component: DashboardView },
  { path: '/booking/:id', component: BookingDetailView },
  { path: '/customers', component: CustomersView },
  { path: '/share', component: ShareLinkView },
  { path: '/settings', component: SettingsView },
  { path: '/', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router