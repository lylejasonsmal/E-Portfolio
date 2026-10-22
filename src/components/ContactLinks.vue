<template>
  <div class="contact-links">
    <a class="button primary" :href="`mailto:${params.contact.email}`"><lucide-icon icon="mail" size="18px" /> {{ params.contact.email }}</a>
    <a class="button secondary" :href="params.contact.linkedInUrl" target="_blank" rel="noopener noreferrer"><lucide-icon icon="linkedin" size="18px" /> LinkedIn: Lyle Smal</a>
  </div>
</template>
<script setup>
import LucideIcon from '@/components/Commonly Used/LucideIcon.vue'

const params = defineProps({
  contact: { type: Object, required: true }
})
</script>
<style scoped>
.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
