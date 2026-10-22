<template>
  <div class="skills-loop">
    <LogoLoop :logos="skillsWithLogos" :speed="40" :logo-height="28" :gap="28" fade-out fade-out-color="var(--page-background)" aria-label="Tools and skills">
      <template #renderItem="{ item }">
        <span class="skill">
          <svg viewBox="0 0 24 24" role="img" :aria-label="item.name"><title>{{ item.name }}</title><path :d="item.icon.path" /></svg>
          <span class="separator" aria-hidden="true">|</span>
        </span>
      </template>
    </LogoLoop>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import LogoLoop from '@/vendor/vue-bits/LogoLoop.vue'

const params = defineProps({
  skills: { type: Array, required: true }
})

const skillsWithLogos = computed(() => params.skills.filter((skill) => skill.icon))
</script>
<style scoped>
.skills-loop {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

.skills-loop :deep(ul) {
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill {
  display: inline-flex;
  align-items: center;
  gap: 28px;
  color: var(--grey-light);
}

.skill svg {
  width: 28px;
  height: 28px;
  fill: currentColor;
  transition: color 0.2s ease-out;
}

.skill svg:hover {
  color: var(--page-text);
}

.separator {
  color: var(--secondary-black);
  font-weight: 200;
  font-size: 1.5rem;
}
</style>
