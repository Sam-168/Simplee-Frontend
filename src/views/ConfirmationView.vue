<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center px-5">

    <!-- Success icon -->
    <div class="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-5">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12l4.5 4.5L19 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Message -->
    <h1 class="text-xl font-medium text-gray-900 mb-2">Booking received!</h1>
    <p class="text-sm text-gray-400 text-center leading-relaxed mb-8">
      {{ name }} will confirm your slot.<br/>
      You'll get a reminder before your appointment.
    </p>

    <!-- Summary card -->
    <div class="w-full border border-gray-100 rounded-2xl overflow-hidden mb-6">
      <div class="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
        <span class="text-sm text-gray-400">Service</span>
        <span class="text-sm font-medium text-gray-900">{{ service }}</span>
      </div>
      <div class="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
        <span class="text-sm text-gray-400">Date</span>
        <span class="text-sm font-medium text-gray-900">{{ formattedDate }}</span>
      </div>
      <div class="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
        <span class="text-sm text-gray-400">Time</span>
        <span class="text-sm font-medium text-gray-900">{{ time }}</span>
      </div>
      <div class="flex justify-between items-center px-4 py-3.5">
        <span class="text-sm text-gray-400">Name</span>
        <span class="text-sm font-medium text-gray-900">{{ name }}</span>
      </div>
    </div>

    <p class="text-xs text-gray-300 text-center">Screenshot this page to save your booking</p>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Pull the query params that PublicBookingView passed us
const name = route.query.name
const service = route.query.service
const date = route.query.date
const time = route.query.time

// Format the date from "2025-04-17" to "Thu, 17 April 2025"
const formattedDate = computed(() => {
  if (!date) return ''
  return new Date(date + 'T00:00:00').toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})
</script>