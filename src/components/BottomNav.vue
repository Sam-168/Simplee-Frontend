<template>
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t border-gray-100 bg-white flex">
    <button
      v-for="item in navItems"
      :key="item.key"
      @click="router.push(item.path)"
      class="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
      :class="active === item.key ? 'text-gray-900' : 'text-gray-300'"
    >
      <component :is="item.icon" />
      <span class="text-xs font-medium">{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { h } from 'vue'

const router = useRouter()

defineProps({
  active: {
    type: String,
    required: true,
  }
})

const BookingsIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('rect', { x: 3, y: 3, width: 6, height: 6, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
  h('rect', { x: 11, y: 3, width: 6, height: 6, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
  h('rect', { x: 3, y: 11, width: 6, height: 6, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
  h('rect', { x: 11, y: 11, width: 6, height: 6, rx: 1.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
])

const CustomersIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('circle', { cx: 10, cy: 7, r: 3.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
  h('path', { d: 'M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
])

const LinkIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { d: 'M10 3v14M3 10h14', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
])

const SettingsIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('circle', { cx: 10, cy: 10, r: 7, stroke: 'currentColor', 'stroke-width': 1.5 }),
  h('circle', { cx: 10, cy: 10, r: 2.5, stroke: 'currentColor', 'stroke-width': 1.5 }),
])

const navItems = [
  { key: 'bookings', label: 'Bookings', path: '/dashboard', icon: BookingsIcon },
  { key: 'customers', label: 'Customers', path: '/customers', icon: CustomersIcon },
  { key: 'link', label: 'Link', path: '/share', icon: LinkIcon },
  { key: 'settings', label: 'Settings', path: '/settings', icon: SettingsIcon },
]
</script>