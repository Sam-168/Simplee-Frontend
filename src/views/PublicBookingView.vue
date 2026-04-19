<template>
  <div class="min-h-screen bg-white">

    <!-- Header -->
    <div class="bg-black px-5 pt-10 pb-6">
      <h1 class="text-white text-xl font-medium">{{ business.name }}</h1>
      <p class="text-white/60 text-sm mt-1">{{ business.type }} · {{ business.location }}</p>
      <p class="text-white/40 text-xs mt-3">Choose a service to get started</p>
    </div>

    <!-- Services -->
    <div class="px-5 pt-5">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Services</p>
      <div class="border border-gray-100 rounded-xl overflow-hidden">
        <div
          v-for="service in business.services"
          :key="service.id"
          @click="selectedService = service"
          class="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 last:border-b-0 cursor-pointer active:bg-gray-50"
        >
          <div>
            <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ service.duration }} min</p>
          </div>
          <div
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
            :class="selectedService?.id === service.id ? 'bg-black border-black' : 'border-gray-300'"
          >
            <svg v-if="selectedService?.id === service.id" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Date & Time (only shows after service selected) -->
    <div v-if="selectedService" class="px-5 pt-6">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Pick a date</p>
      <input
        v-model="selectedDate"
        type="date"
        :min="today"
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 focus:outline-none focus:border-gray-400"
      />

      <div v-if="selectedDate" class="mt-5">
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Pick a time</p>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="slot in timeSlots"
            :key="slot.time"
            @click="!slot.taken && (selectedTime = slot.time)"
            class="h-10 rounded-xl border text-sm transition-colors"
            :class="
              slot.taken
                ? 'border-gray-100 text-gray-300 line-through cursor-not-allowed'
                : selectedTime === slot.time
                ? 'bg-black border-black text-white font-medium'
                : 'border-gray-200 text-gray-900 active:bg-gray-50'
            "
          >
            {{ slot.time }}
          </button>
        </div>
      </div>
    </div>

    <!-- Customer details (only shows after time selected) -->
    <div v-if="selectedTime" class="px-5 pt-6">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Your details</p>
      <div class="flex flex-col gap-3">
        <input
          v-model="form.name"
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
          v-model="form.notes"
          type="text"
          placeholder="Notes (optional)"
          class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
        />
      </div>
    </div>

    <!-- Submit button -->
    <div v-if="selectedTime" class="px-5 pt-5 pb-10">
      <button
        @click="submitBooking"
        :disabled="!form.name || !form.phone"
        class="w-full h-12 bg-black text-white text-sm font-medium rounded-xl disabled:opacity-30 active:scale-95 transition-transform"
      >
        Confirm booking
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const today = new Date().toISOString().split('T')[0]

// Hardcoded for now — will come from your API later
const business = {
  name: 'Nails by Zanele',
  type: 'Nail salon',
  location: 'Soweto',
  services: [
    { id: 1, name: 'Gel manicure', duration: 60 },
    { id: 2, name: 'Acrylic full set', duration: 90 },
    { id: 3, name: 'Pedicure', duration: 45 },
  ]
}

const timeSlots = [
  { time: '09:00', taken: true },
  { time: '10:00', taken: true },
  { time: '11:00', taken: false },
  { time: '12:00', taken: false },
  { time: '13:00', taken: false },
  { time: '14:00', taken: false },
  { time: '15:00', taken: false },
  { time: '16:00', taken: false },
]

const selectedService = ref(null)
const selectedDate = ref('')
const selectedTime = ref('')
const form = ref({ name: '', phone: '', notes: '' })

function submitBooking() {
  if (!form.value.name || !form.value.phone) return

  // Will POST to your Spring Boot API later
  // For now just navigate to confirmation
  router.push({
    path: '/confirmation',
    query: {
      name: form.value.name,
      service: selectedService.value.name,
      date: selectedDate.value,
      time: selectedTime.value,
    }
  })
}
</script>