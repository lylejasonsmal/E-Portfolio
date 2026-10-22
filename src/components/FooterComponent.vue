<template>
  <footer>
    <div class="inner-container">
      <img :src="logo" :alt="web_configuration.appName" width="40" height="40" loading="lazy" />

      <p v-if="web_configuration.showVersionNumber" class="version-number">
        <lucide-icon icon="package" size="20px" />
        Version: {{ packageJson.version }}
      </p>
    </div>
  </footer>
</template>
<script setup>
  import { web_configuration } from '../../web_configuration.js'
  import packageJson from '../../package.json'
  import logo from '@/assets/logo.svg'
  import LucideIcon from '@/components/Commonly Used/LucideIcon.vue'
</script>
<style scoped>
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  top: inherit;
  width: 100%;
  backdrop-filter: blur(15px) brightness(90%);
  color: var(--primary-white);
  margin: 0;
  padding: 20px;
  gap: 0;
  border-top: 1px solid var(--border-colour);
  box-sizing: border-box;
}

.inner-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  padding: 20px;
  gap: 15px;
  flex-wrap: wrap;
  box-sizing: border-box;
}

img {
  height: 40px;
  width: 40px;
}

.version-number {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 80%;
  color: var(--grey-mid);
  margin: 0;
  font-weight: bold;
}
</style>
