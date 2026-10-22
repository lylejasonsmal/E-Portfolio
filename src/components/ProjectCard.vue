<template>
  <article class="project-card" :aria-labelledby="`${params.project.id}-name`">
    <div class="details">
      <h3 :id="`${params.project.id}-name`" :class="`title-${params.project.titleFont}`">{{ params.project.name }}</h3>
      <p class="summary">{{ params.project.summary }}</p>
      <div class="links">
        <a class="button primary" :href="params.project.liveUrl" target="_blank" rel="noopener noreferrer">View live <lucide-icon icon="arrow-up-right" size="18px" /></a>
        <a class="button secondary" :href="params.project.repoUrl" target="_blank" rel="noopener noreferrer">Source code <lucide-icon icon="arrow-up-right" size="18px" /></a>
      </div>
    </div>
    <div class="folder-slot">
      <ProjectFolder :name="params.project.name" :stack="params.project.stack" />
    </div>
  </article>
</template>
<script setup>
import LucideIcon from '@/components/Commonly Used/LucideIcon.vue'
import ProjectFolder from '@/components/ui/ProjectFolder.vue'

const params = defineProps({
  project: { type: Object, required: true }
})
</script>
<style scoped>
.project-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 40px;
}

.project-card + .project-card {
  margin-top: 96px;
}

h3 {
  margin: 0 0 8px;
  font-weight: 400;
  line-height: 1;
}

.title-handwritten {
  font-family: var(--font-handwritten);
  font-size: 2.6rem;
}

.title-heading {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  font-size: 1.9rem;
}

.title-accent {
  font-family: var(--font-accent);
  font-style: italic;
  font-size: 2.2rem;
}

.summary {
  margin: 0 0 20px;
  line-height: 1.6;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 700px) {
  .project-card {
    grid-template-columns: 1fr;
  }

  .folder-slot {
    padding-top: 190px;
  }
}
</style>
