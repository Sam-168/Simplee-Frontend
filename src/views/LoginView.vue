<template>
  <div class="min-h-screen bg-white flex flex-col px-5 pt-16 pb-10">

    <!-- Heading -->
    <div class="mb-8">
      <h1 class="text-2xl font-medium text-gray-900">Welcome back</h1>
      <p class="text-sm text-gray-400 mt-1">Log in to manage your bookings</p>
    </div>

    <!-- Form -->
    <div class="flex flex-col gap-3">
      <input
        v-model="form.phone"
        type="tel"
        placeholder="Phone number"
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-xs text-red-400 mt-3">{{ error }}</p>

    <!-- Login button -->
    <button
      @click="handleLogin"
      :disabled="loading || !form.phone || !form.password"
      class="w-full h-12 bg-black text-white text-sm font-medium rounded-xl mt-5 disabled:opacity-30 active:scale-95 transition-transform"
    >
      {{ loading ? 'Logging in...' : 'Log in' }}
    </button>

    <!-- Forgot password -->
    <p class="text-sm text-gray-400 text-center mt-4 cursor-pointer">Forgot password?</p>

    <!-- Divider -->
    <div class="flex items-center gap-3 my-6">
      <div class="flex-1 h-px bg-gray-100"></div>
      <span class="text-xs text-gray-300">or</span>
      <div class="flex-1 h-px bg-gray-100"></div>
    </div>

    <!-- Sign up link -->
    <button
      @click="router.push('/signup')"
      class="w-full h-12 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl active:bg-gray-50 transition-colors"
    >
      Create a new account
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ phone: '', password: '' })
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    await authStore.login(form.value.phone, form.value.password)
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Incorrect phone number or password'
  } finally {
    loading.value = false
  }
}
</script>