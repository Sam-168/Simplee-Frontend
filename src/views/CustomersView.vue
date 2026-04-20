<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- Header -->
    <div class="px-5 pt-10 pb-4 border-b border-gray-100">
      <h1 class="text-xl font-medium text-gray-900">Customers</h1>
      <p class="text-sm text-gray-400 mt-0.5">Tap to see their history</p>
    </div>

    <!-- Search -->
    <div class="px-5 pt-4 pb-2">
      <input
        v-model="search"
        type="text"
        placeholder="Search customers..."
        class="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400"
      />
    </div>

    <!-- Empty state -->
    <div
      v-if="filteredCustomers.length === 0 && !search"
      class="flex flex-col items-center justify-center flex-1 px-5 py-16 text-center"
    >
      <div class="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#d1d5db" stroke-width="1.5"/>
          <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <p class="text-base font-medium text-gray-900 mb-1">No customers yet</p>
      <p class="text-sm text-gray-400 leading-relaxed">
        Customers will appear here once they make their first booking.
      </p>
    </div>

    <!-- No search results -->
    <div
      v-else-if="filteredCustomers.length === 0 && search"
      class="flex flex-col items-center justify-center flex-1 px-5 py-16 text-center"
    >
      <p class="text-base font-medium text-gray-900 mb-1">No results</p>
      <p class="text-sm text-gray-400">No customers match "{{ search }}"</p>
    </div>

    <!-- Customer list -->
    <div v-else class="px-5 pt-2 pb-24 flex flex-col">
      <div
        v-for="customer in filteredCustomers"
        :key="customer.id"
        @click="selectedCustomer = customer"
        class="flex items-center gap-3 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer active:bg-gray-50 -mx-5 px-5 transition-colors"
      >
        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span class="text-sm font-medium text-gray-500">{{ getInitials(customer.name) }}</span>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900">{{ customer.name }}</p>
          <p class="text-xs text-gray-400 mt-0.5 truncate">Last: {{ customer.lastService }} · {{ customer.lastDate }}</p>
        </div>

        <!-- Visit count -->
        <p class="text-xs text-gray-300 flex-shrink-0">{{ customer.visits }} visit{{ customer.visits === 1 ? '' : 's' }}</p>
      </div>
    </div>

    <!-- Customer history bottom sheet -->
    <div
      v-if="selectedCustomer"
      class="fixed inset-0 z-50 flex flex-col justify-end"
      style="max-width: 448px; left: 50%; transform: translateX(-50%);"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/40"
        @click="selectedCustomer = null"
      ></div>

      <!-- Sheet -->
      <div class="relative bg-white rounded-t-3xl px-5 pt-4 pb-10 z-10">

        <!-- Handle -->
        <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>

        <!-- Customer name -->
        <div class="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div class="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span class="text-sm font-medium text-gray-500">{{ getInitials(selectedCustomer.name) }}</span>
          </div>
          <div>
            <p class="text-base font-medium text-gray-900">{{ selectedCustomer.name }}</p>
            <p class="text-sm text-gray-400">{{ selectedCustomer.phone }}</p>
          </div>
        </div>

        <!-- History list -->
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Booking history</p>
        <div class="flex flex-col gap-2">
          <div
            v-for="(visit, index) in selectedCustomer.history"
            :key="index"
            class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ visit.service }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ visit.date }}</p>
            </div>
            <span
              class="text-xs font-medium px-2.5 py-1 rounded-full"
              :class="visit.status === 'Completed'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-500'"
            >
              {{ visit.status }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <BottomNav active="customers" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BottomNav from '../components/BottomNav.vue'

const search = ref('')
const selectedCustomer = ref(null)

// Hardcoded for now — will come from Spring Boot API later
const customers = ref([
  {
    id: 1,
    name: 'Thandi Dlamini',
    phone: '+27 71 111 2233',
    lastService: 'Gel manicure',
    lastDate: '17 Apr',
    visits: 4,
    history: [
      { service: 'Gel manicure', date: 'Thu 17 April', status: 'Completed' },
      { service: 'Pedicure', date: 'Mon 3 April', status: 'Completed' },
      { service: 'Acrylic full set', date: 'Fri 10 March', status: 'Completed' },
      { service: 'Gel manicure', date: 'Sat 18 February', status: 'Completed' },
    ]
  },
  {
    id: 2,
    name: 'Nomsa Khumalo',
    phone: '+27 73 456 7890',
    lastService: 'Acrylic full set',
    lastDate: '3 Apr',
    visits: 2,
    history: [
      { service: 'Acrylic full set', date: 'Thu 17 April', status: 'Pending' },
      { service: 'Gel manicure', date: 'Fri 3 March', status: 'Completed' },
    ]
  },
  {
    id: 3,
    name: 'Lerato Sithole',
    phone: '+27 76 789 0123',
    lastService: 'Pedicure',
    lastDate: '10 Apr',
    visits: 3,
    history: [
      { service: 'Pedicure', date: 'Thu 17 April', status: 'Pending' },
      { service: 'Gel manicure', date: 'Tue 21 March', status: 'Completed' },
      { service: 'Pedicure', date: 'Mon 6 February', status: 'Completed' },
    ]
  },
  {
    id: 4,
    name: 'Puleng Molete',
    phone: '+27 79 111 2233',
    lastService: 'Gel manicure',
    lastDate: 'today',
    visits: 1,
    history: [
      { service: 'Gel manicure', date: 'Thu 17 April', status: 'Pending' },
    ]
  },
])

const filteredCustomers = computed(() => {
  if (!search.value.trim()) return customers.value
  const q = search.value.toLowerCase()
  return customers.value.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.phone.includes(q)
  )
})

function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}
</script>