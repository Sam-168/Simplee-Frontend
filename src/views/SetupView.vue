<template>
  <div class="min-h-screen bg-white flex flex-col px-5 pt-16 pb-10">

    <!-- Heading -->
    <div class="mb-8">
      <h1 class="text-2xl font-medium text-gray-900">Set up your services</h1>
      <p class="text-sm text-gray-400 mt-1">Customers will choose from these</p>
    </div>

    <!-- Business type toggle -->
    <div class="mb-6">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Business type</p>
      <div class="flex border border-gray-200 rounded-xl overflow-hidden">
        <button
          @click="businessType = 'bookings'"
          class="flex-1 h-11 text-sm font-medium transition-colors"
          :class="businessType === 'bookings' ? 'bg-black text-white' : 'text-gray-400'"
        >
          Bookings
        </button>
        <button
          @click="businessType = 'orders'"
          class="flex-1 h-11 text-sm font-medium transition-colors"
          :class="businessType === 'orders' ? 'bg-black text-white' : 'text-gray-400'"
        >
          Orders
        </button>
      </div>
    </div>

    <!-- Add service form -->
    <div class="mb-4">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
        {{ businessType === 'bookings' ? 'Add a service' : 'Add an item' }}
      </p>
      <div class="flex flex-col gap-3">
        <input
          v-model="newService.name"
          type="text"
          :placeholder="businessType === 'bookings' ? 'e.g. Gel manicure' : 'e.g. Chicken burger'"
          class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
        />
        <input
          v-if="businessType === 'bookings'"
          v-model="newService.duration"
          type="number"
          placeholder="Duration (minutes)"
          class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
        />
        <input
          v-model="newService.description"
          type="text"
          placeholder="Description (optional)"
          class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
        />
      </div>

      <button
        @click="addService"
        :disabled="!newService.name"
        class="w-full h-11 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl mt-3 disabled:opacity-30 active:bg-gray-50 transition-colors"
      >
        + Add {{ businessType === 'bookings' ? 'service' : 'item' }}
      </button>
    </div>

    <!-- Services added -->
    <div v-if="services.length > 0" class="mb-8">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Added</p>
      <div class="border border-gray-100 rounded-xl overflow-hidden">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 last:border-b-0"
        >
          <div>
            <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
            <p v-if="service.duration" class="text-xs text-gray-400 mt-0.5">{{ service.duration }} min</p>
            <p v-if="service.description" class="text-xs text-gray-400 mt-0.5">{{ service.description }}</p>
          </div>
          <button @click="removeService(index)" class="text-gray-300 text-lg leading-none pl-4">
            ×
          </button>
        </div>
      </div>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-xs text-red-400 mb-3">{{ error }}</p>

    <!-- Finish button -->
    <button
      @click="handleFinish"
      :disabled="loading || services.length === 0"
      class="w-full h-12 bg-black text-white text-sm font-medium rounded-xl disabled:opacity-30 active:scale-95 transition-transform"
    >
      {{ loading ? 'Saving...' : 'Finish setup' }}
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const businessType = ref('bookings')
const services = ref([])
const error = ref('')
const loading = ref(false)

const newService = ref({
  name: '',
  duration: '',
  description: '',
})

function addService() {
  if (!newService.value.name) return

  services.value.push({
    name: newService.value.name,
    duration: newService.value.duration || null,
    description: newService.value.description || null,
  })

  // Reset the form fields after adding
  newService.value = { name: '', duration: '', description: '' }
}

function removeService(index) {
  services.value.splice(index, 1)
}

async function handleFinish() {
  if (services.value.length === 0) {
    error.value = 'Please add at least one service'
    return
  }

  error.value = ''
  loading.value = true

  // Temporary — will POST to Spring Boot API later
  setTimeout(() => {
    loading.value = false
    router.push('/dashboard')
  }, 500)
}
</script>