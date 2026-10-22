<template>
  <div class="interactive-wordmark" aria-hidden="true">
    <TechText :text="params.text" :font-weight="fontWeight" :color="colour" :accent-color="accentColour" />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import TechText from '@/vendor/vue-bits/TechText.vue'

const params = defineProps({
  text: { type: String, required: true }
})

const colour = ref(undefined)
const accentColour = ref(undefined)
const fontWeight = ref(undefined)

function readToken(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
}

onMounted(() => {
  colour.value = readToken('--page-text')
  accentColour.value = readToken('--accent')
  const headingWeight = readToken('--font-weight-heading')
  fontWeight.value = headingWeight ? Number(headingWeight) : undefined
})
</script>
<style scoped>
.interactive-wordmark {
  width: 100%;
  height: clamp(120px, 20vw, 200px);
  font-family: var(--font-heading);
}
</style>
