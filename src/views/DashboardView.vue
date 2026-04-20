<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- Header -->
    <div class="px-5 pt-10 pb-0">
      <div class="flex items-center justify-between mb-1">
        <div>
          <h1 class="text-xl font-medium text-gray-900">Today</h1>
          <p class="text-sm text-gray-400 mt-0.5">{{ formattedToday }}</p>
        </div>
        <span class="text-sm text-gray-400">{{ todayBookings.length }} bookings</span>
      </div>

      <!-- Tabs -->
      <div class="flex mt-4 border-b border-gray-100">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px"
          :class="activeTab === tab
            ? 'border-black text-gray-900'
            : 'border-transparent text-gray-400'"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="px-5 pt-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or number..."
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
    </div>

    <!-- Empty state -->
    <div v-if="filteredBookings.length === 0" class="flex flex-col items-center justify-center flex-1 px-5 py-16">
      <div class="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#d1d5db" stroke-width="1.5"/>
          <path d="M8 4V2M16 4V2M3 9h18" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <p class="text-base font-medium text-gray-900 mb-1">No bookings yet</p>
      <p class="text-sm text-gray-400 text-center leading-relaxed mb-6">
        Share your booking link and customers will appear here automatically.
      </p>
      <div class="w-full border border-gray-100 rounded-2xl overflow-hidden mb-6">
        <div class="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <div class="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="text-sm text-gray-900">Create your account</p>
        </div>
        <div class="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <div class="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="text-sm text-gray-900">Add your services</p>
        </div>
        <div class="flex items-center gap-3 px-4 py-3.5">
          <div class="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
            <span class="text-xs text-gray-400 font-medium">3</span>
          </div>
          <p class="text-sm text-gray-400">Share your link with customers</p>
        </div>
      </div>
      <button
        @click="router.push('/share')"
        class="btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl active:scale-95 transition-transform"
      >
        Share my booking link
      </button>
    </div>

    <!-- Booking list -->
    <div v-else class="px-5 pt-3 pb-24 flex flex-col gap-2">
      <div
        v-for="booking in filteredBookings"
        :key="booking.id"
        @click="router.push('/booking/' + booking.id)"
        class="border border-gray-100 rounded-2xl px-4 py-4 active:bg-gray-50 cursor-pointer transition-colors"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ booking.customerName }}</p>
            <p class="text-sm text-gray-400 mt-0.5">{{ booking.service }}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5">
            <p class="text-xs text-gray-400">{{ booking.time }}</p>
            <span
              class="text-xs font-medium px-2.5 py-0.5 rounded-full"
              :class="booking.status === 'Completed'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-500'"
            >
              {{ booking.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom nav -->
    <BottomNav active="bookings" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()

const tabs = ['Today', 'Upcoming', 'All']
const activeTab = ref('Today')
const search = ref('')

const formattedToday = computed(() => {
  return new Date().toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})

// Hardcoded for now — will come from Spring Boot API later
const allBookings = ref([
  { id: 1, customerName: 'Thandi Dlamini', service: 'Gel manicure', time: '10:00', date: 'today', status: 'Completed' },
  { id: 2, customerName: 'Nomsa Khumalo', service: 'Acrylic full set', time: '11:30', date: 'today', status: 'Pending' },
  { id: 3, customerName: 'Lerato Sithole', service: 'Pedicure', time: '13:00', date: 'today', status: 'Pending' },
  { id: 4, customerName: 'Puleng Molete', service: 'Gel manicure', time: '14:30', date: 'today', status: 'Pending' },
])

const todayBookings = computed(() =>
  allBookings.value.filter(b => b.date === 'today')
)

const filteredBookings = computed(() => {
  let list = []

  if (activeTab.value === 'Today') list = todayBookings.value
  else if (activeTab.value === 'Upcoming') list = allBookings.value.filter(b => b.date === 'upcoming')
  else list = allBookings.value

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(b =>
      b.customerName.toLowerCase().includes(q) ||
      b.service.toLowerCase().includes(q)
    )
  }

  return list
})
</script>