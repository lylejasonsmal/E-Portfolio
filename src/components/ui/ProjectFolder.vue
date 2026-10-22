<template>
  <div class="project-folder">
    <FolderFloat
      :items="params.stack"
      :label="params.name"
      :sublabel="`Built with ${params.stack.length} tools`"
      :trigger="trigger"
      :close-on-select="false"
      :spread="160"
      folder-color="var(--secondary-black)"
      front-color="var(--grey-dark)"
      paper-color="var(--grey-paper)"
      item-color="var(--grey-paper)"
      item-text-color="var(--primary-black)"
      label-color="var(--page-text)"
    />
  </div>
</template>
<script setup>
import FolderFloat from '@/vendor/vue-bits/FolderFloat.vue'

const params = defineProps({
  name: { type: String, required: true },
  stack: { type: Array, required: true }
})

const trigger = window.matchMedia?.('(hover: hover)').matches ? 'hover' : 'click'
</script>
<style scoped>
.project-folder {
  display: flex;
  justify-content: center;
  font-family: var(--font-body);
}

.project-folder :deep(button) {
  backdrop-filter: none;
}
</style>
