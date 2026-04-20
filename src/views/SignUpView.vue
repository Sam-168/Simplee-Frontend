<template>
  <div class="min-h-screen bg-white flex flex-col px-5 pt-16 pb-10">

    <!-- Heading -->
    <div class="mb-8">
      <h1 class="text-2xl font-medium text-gray-900">Create your account</h1>
      <p class="text-sm text-gray-400 mt-1">Set up your business in 2 minutes</p>
    </div>

    <!-- Form -->
    <div class="flex flex-col gap-3">
      <input
        v-model="form.businessName"
        type="text"
        placeholder="Business name"
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
      <input
        v-model="form.ownerName"
        type="text"
        placeholder="Your name"
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
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
      <input
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirm password"
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-xs text-red-400 mt-3">{{ error }}</p>

    <!-- Submit button -->
    <button
      @click="handleSignUp"
      :disabled="loading || !isFormValid"
      class="btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl mt-5 disabled:opacity-30 active:scale-95 transition-transform"
    >
      {{ loading ? 'Creating account...' : 'Create account' }}
    </button>

    <!-- Divider -->
    <div class="flex items-center gap-3 my-6">
      <div class="flex-1 h-px bg-gray-100"></div>
      <span class="text-xs text-gray-300">or</span>
      <div class="flex-1 h-px bg-gray-100"></div>
    </div>

    <!-- Login link -->
    <button
      @click="router.push('/login')"
      class="btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl active:bg-gray-50 transition-colors"
    >
      Already have an account
    </button>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  businessName: '',
  ownerName: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const error = ref('')
const loading = ref(false)

// All fields filled and passwords match
const isFormValid = computed(() => {
  return (
    form.value.businessName &&
    form.value.ownerName &&
    form.value.phone &&
    form.value.password &&
    form.value.confirmPassword
  )
})

async function handleSignUp() {
  error.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true

  try {
    await authStore.signUp(form.value)
    router.push('/setup')
  } catch (e) {
    error.value = e.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>