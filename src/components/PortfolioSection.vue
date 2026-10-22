<template>
  <section :id="params.id" :aria-labelledby="headingId">
    <slot name="lead" />
    <h2 :id="headingId">{{ params.title }}</h2>
    <slot>
      <p>Placeholder paragraph.</p>
    </slot>
  </section>
</template>
<script setup>
import { computed } from 'vue'

const params = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true }
})

const headingId = computed(() => `${params.id}-heading`)
</script>
<style scoped>
section {
  width: 90vw;
  max-width: 900px;
  padding: 60px 0;
  scroll-margin-top: var(--header-offset);
}
</style>
