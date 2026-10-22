<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import PortfolioSection from '@/components/PortfolioSection.vue'
import { sections } from '@/content/sections.js'
import InteractiveWordmark from '@/components/ui/InteractiveWordmark.vue'
import AuroraBackground from '@/components/ui/AuroraBackground.vue'
import portrait from '@/assets/lyle-smal.jpg'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/content/projects.js'
import SkillsLoop from '@/components/ui/SkillsLoop.vue'
import { skills, skillCategories } from '@/content/skills.js'
import SkillCategories from '@/components/SkillCategories.vue'
import ExperienceTimeline from '@/components/ExperienceTimeline.vue'
import { experience } from '@/content/experience.js'
import ContactLinks from '@/components/ContactLinks.vue'
import { contact } from '@/content/contact.js'
import WhatsNextSection from '@/components/WhatsNextForLyleSection.vue'
</script>

<template>
  <HeaderComponent />
  <main>
    <section class="introduction" aria-labelledby="introduction-heading">
      <AuroraBackground />
      <div class="introduction-content">
        <h1 id="introduction-heading" class="visually-hidden">Lyle Smal</h1>
        <div class="name-row">
          <img class="portrait" :src="portrait" alt="Portrait of Lyle Smal" width="400" height="400" fetchpriority="high" />
          <div class="name-block">
            <InteractiveWordmark text="Lyle Smal" />
            <p class="tagline">Software Developer <span class="separator" aria-hidden="true">|</span> 1+ Years Experience</p>
          </div>
        </div>
        <p class="introduction-text">Hey, I'm Lyle, your <em class="handwritten-text">friendly neighbourhood developer</em>. I treat code like a good sudoku puzzle: one thoughtful move at a time, with that quiet satisfaction when the last square clicks into place <em class="accent-text">*click</em>. The part I love most is <em class="accent-text">what the work teaches me</em> along the way. Every project leaves me <strong class="heading-text">curious</strong> about something new, and I'm always happy to chase it down the rabbit hole.</p>
      </div>
    </section>
    <PortfolioSection v-for="section in sections" :key="section.id" :id="section.id" :title="section.title">
      <template v-if="section.id === 'skills'" #lead>
        <SkillsLoop class="skills-lead" :skills="skills" />
      </template>
      <template v-if="section.id === 'skills'">
        <SkillCategories :categories="skillCategories" :skills="skills" />
      </template>
      <template v-else-if="section.id === 'projects'">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </template>
      <WhatsNextSection v-else-if="section.id === 'next'"/>
      <ExperienceTimeline v-else-if="section.id === 'experience'" :roles="experience" />
      <ContactLinks v-else-if="section.id === 'contact'" :contact="contact" />
      <ContactLinks v-else-if="section.id === 'contact'" :contact="contact" />
      <p v-else>Placeholder paragraph.</p>
    </PortfolioSection>
  </main>
  <FooterComponent />
</template>

<style scoped>
.introduction {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: calc(-1 * var(--header-offset));
  padding: calc(var(--header-offset) + 32px) 0 32px;
  overflow: hidden;
}

.introduction-content {
  position: relative;
  z-index: 1;
  width: 90vw;
  max-width: 900px;
}

.name-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

.introduction-text {
  line-height: 1.6;
}

.skills-lead {
  padding-bottom: 79px;
}

.name-block {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.tagline {
  margin: -14px 0 0;
  color: var(--grey-mid);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.separator {
  margin: 0 0.3em;
  color: var(--secondary-black);
  font-weight: 200;
}

.portrait {
  flex-shrink: 0;
  width: clamp(112px, 14vw, 168px);
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--surface-border);
}

@media (max-width: 600px) {
  .name-row {
    flex-direction: column;
    gap: 8px;
  }

  .name-block {
    width: 100%;
  }
}
</style>
