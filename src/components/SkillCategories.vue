<template>
  <div class="skill-categories">
    <div v-for="category in params.categories" :key="category" class="category">
      <h3>{{ category }}</h3>
      <ul>
        <li v-for="skill in skillsIn(category)" :key="skill.name">{{ skill.name }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const params = defineProps({
  categories: { type: Array, required: true },
  skills: { type: Array, required: true }
})

function skillsIn(category) {
  return params.skills.filter((skill) => skill.category === category)
}
</script>
<style scoped>
.skill-categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px 40px;
}

h3 {
  margin: 0 0 12px;
  color: var(--grey-mid);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

li {
  line-height: 1.4;
}

@media (max-width: 700px) {
  .skill-categories {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
