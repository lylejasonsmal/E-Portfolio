<template>
  <header ref="headerRef">
    <div class="bar">
      <a href="#" class="logo-link"><img :src="logo" :alt="web_configuration.appName" width="34" height="34" /></a>

      <button type="button" class="menu-button" aria-controls="site-nav" :aria-expanded="isMenuOpen ? 'true' : 'false'" :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'" @click="toggleMenu">
        <lucide-icon :icon="isMenuOpen ? 'x' : 'menu'" size="22px" />
      </button>

      <nav id="site-nav" aria-label="Sections" :class="{ open: isMenuOpen }">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" :class="{ active: activeHref === `#${section.id}`, 'call-to-action': section.callToAction }" @click="choose(section)">{{ section.title }}</a>
      </nav>
    </div>
  </header>
</template>
<script setup>
import logo from '@/assets/logo.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import LucideIcon from '@/components/Commonly Used/LucideIcon.vue'
import { sections } from '@/content/sections.js'
import { web_configuration } from '../../web_configuration.js'

const headerRef = ref(null)
const isMenuOpen = ref(false)
const activeHref = ref(window.location.hash)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function choose(section) {
  activeHref.value = `#${section.id}`
  isMenuOpen.value = false
}

function closeOnEscape(event) {
  if (event.key === 'Escape') isMenuOpen.value = false
}

function closeOnOutsidePress(event) {
  if (!headerRef.value?.contains(event.target)) isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape)
  document.addEventListener('pointerdown', closeOnOutsidePress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeOnEscape)
  document.removeEventListener('pointerdown', closeOnOutsidePress)
})
</script>
<style scoped>
header {
  position: fixed;
  top: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  z-index: 1000;
  box-sizing: border-box;
}

.bar {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  height: var(--header-height);
  padding: 0 10px 0 16px;
  box-sizing: border-box;
  border: 1px solid var(--surface-border);
  border-radius: 14px;
  background: var(--surface-raised);
  backdrop-filter: blur(14px);
}

.logo-link {
  display: flex;
  align-items: center;
  border-radius: 6px;
}

.logo-link img {
  width: 34px;
  height: 34px;
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

nav a {
  padding: 8px 12px;
  border-radius: 10px;
  color: var(--grey-mid);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease-out, background-color 0.2s ease-out;
}

nav a:hover,
nav a.active {
  color: var(--page-text);
}

nav a.call-to-action {
  margin-left: 8px;
  padding: 8px 16px;
  background: var(--primary-white);
  color: var(--primary-black);
  font-weight: 600;
}

nav a.call-to-action:hover {
  background: var(--grey-light);
}

a:focus-visible,
.menu-button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.menu-button {
  all: unset;
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: var(--page-text);
  cursor: pointer;
}

@media (max-width: 600px) {
  .menu-button {
    display: flex;
  }

  nav {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
    padding: 8px;
    border: 1px solid var(--surface-border);
    border-radius: 14px;
    background: var(--surface-overlay);
    backdrop-filter: blur(14px);
  }

  nav.open {
    display: flex;
    animation: drop-in 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  }

  nav a {
    padding: 14px 12px;
    font-size: 1.05rem;
  }

  nav a.call-to-action {
    margin: 6px 0 0;
    text-align: center;
  }

  @keyframes drop-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  nav.open {
    animation: none;
  }
}
</style>
