<template>
  <div :class="isLandingPage ? '' : 'max-w-md mx-auto min-h-screen bg-white'">
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLandingPage = computed(() => route.path === '/welcome')
</script>