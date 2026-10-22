<template>
  <div class="aurora-background" aria-hidden="true">
    <Aurora v-if="colourStops" :color-stops="colourStops" :speed="speed" :blend="0.5" :amplitude="1" />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import Aurora from '@/vendor/vue-bits/Aurora.vue'

const colourStops = ref(null)
const speed = ref(0.5)

function readToken(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function supportsWebGL() {
  const canvas = document.createElement('canvas')
  return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
}

onMounted(() => {
  if (!supportsWebGL()) return
  speed.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 0 : 0.5
  colourStops.value = [readToken('--page-background') || '#141414', readToken('--accent') || '#E0798F', readToken('--page-background') || '#141414']
})
</script>
<style scoped>
.aurora-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
