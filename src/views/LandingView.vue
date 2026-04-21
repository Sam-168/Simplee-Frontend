<template>
  <div class="min-h-screen bg-white">

    <!-- Nav -->
    <nav class="flex items-center justify-between px-5 py-4 md:px-12 lg:px-20 border-b border-gray-100">
      <p class="text-base font-medium text-gray-900">Simplee</p>
      <div class="flex items-center gap-3">
        <button
          @click="router.push('/login')"
          class="text-sm text-gray-500 font-medium px-4 py-2 active:bg-gray-50 rounded-xl transition-colors"
        >
          Log in
        </button>
        <button
          @click="router.push('/signup')"
          class="text-sm font-medium px-4 py-2 bg-black text-white rounded-xl active:scale-95 transition-transform"
        >
          Get started
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="px-5 pt-16 pb-16 md:px-12 lg:px-20 flex flex-col lg:flex-row lg:items-center lg:gap-16">
      <div class="flex-1 mb-12 lg:mb-0">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-500 font-medium mb-6"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[rgb(41,111,208)]"></span>
          Book fast, book easy.
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight mb-5">
          Stop losing bookings<br class="hidden md:block" /> to WhatsApp chats
        </h1>

        <p class="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
          Get a simple booking link you can share anywhere. Customers book in seconds. You see everything in one place. No app download needed.
        </p>

        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="router.push('/signup')"
            class="h-12 px-6 bg-black text-white text-sm font-medium rounded-xl active:scale-95 transition-transform"
          >
            Create your free account
          </button>
          <button
            @click="router.push('/book/demo')"
            class="h-12 px-6 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl active:bg-gray-50 transition-colors"
          >
            See how it works
          </button>
        </div>
      </div>

      <!-- Phone mockup -->
      <div class="flex-1 flex justify-center lg:justify-end">
        <div class="w-64 md:w-72 bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div class="bg-black px-5 pt-8 pb-5">
            <p class="text-white text-base font-medium">Nails by Zanele</p>
            <p class="text-white/50 text-xs mt-0.5">Nail salon · Soweto</p>
          </div>
          <div class="p-4 flex flex-col gap-2">
            <div v-for="service in mockServices" :key="service" class="flex items-center justify-between px-3 py-3 bg-white rounded-xl border border-gray-100">
              <p class="text-xs font-medium text-gray-900">{{ service.name }}</p>
              <p class="text-xs text-gray-400">{{ service.duration }}</p>
            </div>
            <div class="mt-1 h-10 bg-black rounded-xl flex items-center justify-center">
              <p class="text-white text-xs font-medium">Confirm booking</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="px-5 py-16 md:px-12 lg:px-20 bg-gray-50">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">How it works</p>
      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 mb-10">Up and running in minutes</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="step in steps" :key="step.number" class="bg-white rounded-2xl p-5 border border-gray-100">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white mb-4"
            :style="{ background: 'rgb(41, 111, 208)' }"
          >
            {{ step.number }}
          </div>
          <p class="text-base font-medium text-gray-900 mb-1">{{ step.title }}</p>
          <p class="text-sm text-gray-400 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Who it's for -->
    <section class="px-5 py-16 md:px-12 lg:px-20">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Who it's for</p>
      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 mb-8">Any small business that takes bookings or orders</h2>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          v-for="type in businessTypes"
          :key="type"
          class="bg-gray-50 rounded-2xl px-4 py-5 flex flex-col items-center gap-2 border border-gray-100"
        >
          <span class="text-2xl">{{ type.icon }}</span>
          <p class="text-xs font-medium text-gray-700 text-center">{{ type.name }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-5 py-16 md:px-12 lg:px-20 bg-black">
      <div class="max-w-xl">
        <h2 class="text-2xl md:text-3xl font-medium text-white mb-3">Ready to organise your bookings?</h2>
        <p class="text-sm text-white/50 mb-6 leading-relaxed">Free to start. No technical knowledge needed. Share your link in under 2 minutes.</p>
        <button
          @click="router.push('/signup')"
          class="h-12 px-6 bg-white text-gray-900 text-sm font-medium rounded-xl active:scale-95 transition-transform"
        >
          Create your free account
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-5 py-6 md:px-12 lg:px-20 border-t border-gray-100 flex items-center justify-between">
      <p class="text-sm font-medium text-gray-900">Simplee</p>
      <p class="text-xs text-gray-400">Built for township businesses</p>
    </footer>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const mockServices = [
  { name: 'Gel manicure', duration: '60 min' },
  { name: 'Acrylic full set', duration: '90 min' },
  { name: 'Pedicure', duration: '45 min' },
]

const steps = [
  {
    number: 1,
    title: 'Create your profile',
    description: 'Sign up, add your services or menu items, and you\'re ready in under 2 minutes.',
  },
  {
    number: 2,
    title: 'Share your link',
    description: 'Post your unique link on WhatsApp, Instagram, or print the QR code for your shop.',
  },
  {
    number: 3,
    title: 'Manage everything',
    description: 'Bookings and orders appear in your dashboard instantly. No more missed messages.',
  },
]

const businessTypes = [
  { icon: '✂️', name: 'Barbers' },
  { icon: '💅', name: 'Nail techs' },
  { icon: '🍱', name: 'Food vendors' },
  { icon: '🔧', name: 'Mechanics' },
  { icon: '👗', name: 'Tailors' },
  { icon: '🧺', name: 'Laundries' },
]
</script>