<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- Header -->
    <div class="flex items-center gap-3 px-5 pt-10 pb-4 border-b border-gray-100">
      <button @click="router.back()" class="w-8 h-8 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 10H5M9 6l-4 4 4 4" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="text-lg font-medium text-gray-900">Booking detail</h1>
    </div>

    <!-- Customer info -->
    <div class="px-5 pt-5 pb-4 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span class="text-sm font-medium text-gray-500">{{ initials }}</span>
          </div>
          <div>
            <p class="text-base font-medium text-gray-900">{{ booking.customerName }}</p>
            <p class="text-sm text-gray-400 mt-0.5">{{ booking.phone }}</p>
          </div>
        </div>
        <span
          class="text-xs font-medium px-2.5 py-1 rounded-full"
          :class="booking.status === 'Completed'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-500'"
        >
          {{ booking.status }}
        </span>
      </div>
    </div>

    <!-- Booking details -->
    <div class="px-5 pt-4">
      <div class="border border-gray-100 rounded-2xl overflow-hidden">
        <div class="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
          <span class="text-sm text-gray-400">Service</span>
          <span class="text-sm font-medium text-gray-900">{{ booking.service }}</span>
        </div>
        <div class="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
          <span class="text-sm text-gray-400">Date</span>
          <span class="text-sm font-medium text-gray-900">{{ booking.date }}</span>
        </div>
        <div class="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
          <span class="text-sm text-gray-400">Time</span>
          <span class="text-sm font-medium text-gray-900">{{ booking.time }}</span>
        </div>
        <div class="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
          <span class="text-sm text-gray-400">Duration</span>
          <span class="text-sm font-medium text-gray-900">{{ booking.duration }}</span>
        </div>
        <div class="flex justify-between items-center px-4 py-3.5">
          <span class="text-sm text-gray-400">Notes</span>
          <span class="text-sm font-medium text-gray-900">{{ booking.notes || '—' }}</span>
        </div>
      </div>
    </div>

    <!-- Status update -->
    <div class="px-5 pt-6">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Update status</p>
      <div class="flex gap-2">
        <button
          v-for="status in statuses"
          :key="status"
          @click="selectedStatus = status"
          class="flex-1 h-11 rounded-xl border text-sm font-medium transition-colors"
          :class="selectedStatus === status
            ? 'btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl'
            : 'border-gray-200 text-gray-500 active:bg-gray-50'"
        >
          {{ status }}
        </button>
      </div>

      <button
        @click="saveStatus"
        :disabled="selectedStatus === booking.status || loading"
        class="btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl mt-3 disabled:opacity-30 active:scale-95 transition-transform"
      >
        {{ loading ? 'Saving...' : 'Save changes' }}
      </button>

      <p v-if="saved" class="text-xs text-center mt-3" style="color: #16a34a">
        Status updated successfully
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const saved = ref(false)

const statuses = ['Pending', 'Completed', 'No show']

// Hardcoded for now — will fetch from Spring Boot API by ID later
const booking = ref({
  id: route.params.id,
  customerName: 'Nomsa Khumalo',
  phone: '+27 73 456 7890',
  service: 'Acrylic full set',
  date: 'Thu 17 April',
  time: '11:30',
  duration: '90 min',
  notes: 'Light pink please',
  status: 'Pending',
})

const selectedStatus = ref(booking.value.status)

const initials = computed(() => {
  return booking.value.customerName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})

async function saveStatus() {
  loading.value = true
  saved.value = false

  // Will PATCH to Spring Boot API later
  await new Promise(resolve => setTimeout(resolve, 600))

  booking.value.status = selectedStatus.value
  loading.value = false
  saved.value = true

  setTimeout(() => { saved.value = false }, 3000)
}
</script>