<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- Header -->
    <div class="px-5 pt-10 pb-4 border-b border-gray-100">
      <h1 class="text-xl font-medium text-gray-900">Settings</h1>
      <p class="text-sm text-gray-400 mt-0.5">Manage your business profile</p>
    </div>

    <div class="px-5 pt-6 flex flex-col gap-5 pb-24">

      <!-- Business profile card -->
      <div>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Business profile</p>
        <div class="border border-gray-100 rounded-2xl overflow-hidden">
          <div class="flex flex-col gap-3 p-4 border-b border-gray-100">
            <div>
              <p class="text-xs text-gray-400 mb-1.5">Business name</p>
              <input
                v-model="form.businessName"
                type="text"
                class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 focus:outline-none"
              />
            </div>
            <div>
              <p class="text-xs text-gray-400 mb-1.5">Your name</p>
              <input
                v-model="form.ownerName"
                type="text"
                class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 focus:outline-none"
              />
            </div>
            <div>
              <p class="text-xs text-gray-400 mb-1.5">Location</p>
              <input
                v-model="form.location"
                type="text"
                placeholder="e.g. Soweto, Johannesburg"
                class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none"
              />
            </div>
            <div>
              <p class="text-xs text-gray-400 mb-1.5">Phone number</p>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 focus:outline-none"
              />
            </div>
          </div>
          <button
            @click="saveProfile"
            :disabled="loading"
            class="w-full h-12 text-sm font-medium transition-colors flex items-center justify-center"
            :class="saved ? 'text-[rgb(41,111,208)]' : 'text-gray-900 active:bg-gray-50'"
          >
            {{ loading ? 'Saving...' : saved ? 'Saved!' : 'Save profile' }}
          </button>
        </div>
      </div>

      <!-- Your link -->
      <div>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Your booking link</p>
        <div class="border border-gray-100 rounded-2xl p-4 flex items-center justify-between gap-3">
          <p class="text-sm text-gray-900 truncate">bookme.app/nails-by-zanele</p>
          <button
            @click="router.push('/share')"
            class="text-sm font-medium flex-shrink-0"
            :style="{ color: 'rgb(41, 111, 208)' }"
          >
            Manage
          </button>
        </div>
      </div>

      <!-- Account -->
      <div>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Account</p>
        <div class="border border-gray-100 rounded-2xl overflow-hidden">
          <button class="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <span class="text-sm text-gray-900">Change password</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50 transition-colors">
            <span class="text-sm text-gray-900">Notifications</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Danger zone -->
      <div>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Account actions</p>
        <div class="border border-gray-100 rounded-2xl overflow-hidden">
          <button
            @click="handleLogout"
            class="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50 transition-colors"
          >
            <span class="text-sm text-red-400 font-medium">Log out</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </div>

    <BottomNav active="settings" />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const saved = ref(false)

const form = ref({
  businessName: authStore.owner?.businessName || 'Nails by Zanele',
  ownerName: authStore.owner?.name || 'Zanele Mokoena',
  location: 'Soweto, Johannesburg',
  phone: authStore.owner?.phone || '',
})

async function saveProfile() {
  loading.value = true
  saved.value = false
  await new Promise(resolve => setTimeout(resolve, 600))
  loading.value = false
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>