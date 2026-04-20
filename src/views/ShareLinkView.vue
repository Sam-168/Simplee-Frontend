<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- Header -->
    <div class="px-5 pt-10 pb-4 border-b border-gray-100">
      <h1 class="text-xl font-medium text-gray-900">Your booking link</h1>
      <p class="text-sm text-gray-400 mt-0.5">Share this with your customers</p>
    </div>

    <div class="px-5 pt-6 flex flex-col gap-5 pb-24">

      <!-- Link box -->
      <div class="border border-gray-100 rounded-2xl p-4">
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Your link</p>
        <p class="text-sm font-medium text-gray-900 break-all mb-3">{{ bookingLink }}</p>
        <button
          @click="copyLink"
          class="btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
          :class="copied ? 'bg-black text-white border-black' : 'text-gray-900 active:bg-gray-50'"
        >
          <svg v-if="!copied" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.2"/>
            <path d="M3 11V3h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ copied ? 'Copied!' : 'Copy link' }}
        </button>
      </div>

      <!-- Share buttons -->
      <div class="flex gap-2">
        <button
          @click="shareWhatsApp"
          class="btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="white" stroke-width="1.2"/>
            <path d="M5.5 9.5c1 2 4 3.5 6 1.5s-1-5-3-4-3 2.5-1 4.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          Share on WhatsApp
        </button>
        <button
          @click="shareNative"
          class="h-12 px-4 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl flex items-center justify-center gap-2 active:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="12" cy="3" r="1.5" stroke="currentColor" stroke-width="1.2"/>
            <circle cx="12" cy="13" r="1.5" stroke="currentColor" stroke-width="1.2"/>
            <circle cx="3" cy="8" r="1.5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M4.3 7l6.2-3M4.3 9l6.2 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          More
        </button>
      </div>

      <!-- QR code section -->
      <div class="border border-gray-100 rounded-2xl p-4">
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">QR code</p>
        <p class="text-xs text-gray-400 mb-4">Print this and display it in your shop</p>

        <!-- QR display -->
        <div class="bg-gray-50 rounded-xl flex flex-col items-center justify-center py-8 mb-3">
          <canvas ref="qrCanvas" class="rounded-lg"></canvas>
          <p class="text-xs text-gray-400 mt-3">Scan to book an appointment</p>
        </div>

        <button
          @click="downloadQR"
          class="btn-black w-full h-12 bg-black text-white text-sm font-medium rounded-xl text-sm font-medium text-gray-900 flex items-center justify-center gap-2 active:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v9M4 8l4 4 4-4M2 13h12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Download QR image
        </button>
      </div>

      <!-- Instructions -->
      <div class="border border-gray-100 rounded-2xl overflow-hidden">
        <div
          v-for="(tip, index) in tips"
          :key="index"
          class="flex items-start gap-3 px-4 py-3.5 border-b border-gray-100 last:border-b-0"
        >
          <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-xs font-medium text-gray-500">{{ index + 1 }}</span>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">{{ tip }}</p>
        </div>
      </div>

    </div>

    <BottomNav active="link" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BottomNav from '../components/BottomNav.vue'

const copied = ref(false)
const qrCanvas = ref(null)

// Will use the real business slug from auth store later
const bookingLink = 'bookme.app/nails-by-zanele'
const fullLink = 'https://bookme.app/nails-by-zanele'

const tips = [
  'Copy your link and paste it into your WhatsApp status so customers can tap it directly.',
  'Print the QR code and stick it at your workspace — customers scan it to book instantly.',
  'Add your link to your Instagram or Facebook bio.',
]

async function copyLink() {
  try {
    await navigator.clipboard.writeText(fullLink)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  } catch {
    // Fallback for older mobile browsers
    const el = document.createElement('textarea')
    el.value = fullLink
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  }
}

function shareWhatsApp() {
  const message = `Book an appointment with me here: ${fullLink}`
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
}

function shareNative() {
  if (navigator.share) {
    navigator.share({
      title: 'Book an appointment',
      text: 'Book an appointment with me here:',
      url: fullLink,
    })
  } else {
    copyLink()
  }
}

function drawQR(canvas) {
  const size = 200
  const cells = 25
  const cellSize = size / cells
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#111111'

  // Corner squares
  function drawCorner(x, y) {
    ctx.fillRect(x * cellSize, y * cellSize, 7 * cellSize, 7 * cellSize)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, 5 * cellSize, 5 * cellSize)
    ctx.fillStyle = '#111111'
    ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, 3 * cellSize, 3 * cellSize)
  }

  drawCorner(0, 0)
  drawCorner(cells - 7, 0)
  drawCorner(0, cells - 7)

  // Random-ish data pattern seeded from the link string
  const seed = fullLink.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  function pseudo(i) {
    return ((seed * 1103515245 + i * 12345) >>> 0) % 2 === 0
  }

  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const inTopLeft = row < 9 && col < 9
      const inTopRight = row < 9 && col > cells - 10
      const inBottomLeft = row > cells - 10 && col < 9
      if (inTopLeft || inTopRight || inBottomLeft) continue
      if (pseudo(row * cells + col)) {
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
      }
    }
  }
}

function downloadQR() {
  const canvas = qrCanvas.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = 'booking-qr.png'
  link.href = canvas.toDataURL()
  link.click()
}

onMounted(() => {
  if (qrCanvas.value) drawQR(qrCanvas.value)
})
</script>