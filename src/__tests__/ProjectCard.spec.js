import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'

const project = {
  id: 'room-dashboard',
  name: 'Room Dashboard',
  summary: 'A live view of one room.',
  stack: ['ESP32', 'Spring Boot', 'Vue 3'],
  liveUrl: 'https://example.com/live/',
  repoUrl: 'https://example.com/repo'
}

describe('ProjectCard', () => {
  it('names the project in an h3 and summarises it', () => {
    const wrapper = mount(ProjectCard, { props: { project } })

    expect(wrapper.find('h3').text()).toBe('Room Dashboard')
    expect(wrapper.find('.summary').text()).toBe('A live view of one room.')
  })

  it('sets each project title in the font that project names', () => {
    const handwritten = mount(ProjectCard, { props: { project: { ...project, titleFont: 'handwritten' } } })
    const accent = mount(ProjectCard, { props: { project: { ...project, titleFont: 'accent' } } })

    expect(handwritten.find('h3').classes()).toContain('title-handwritten')
    expect(accent.find('h3').classes()).toContain('title-accent')
  })

  it('floats the stack out of a folder labelled with the project name', () => {
    const wrapper = mount(ProjectCard, { props: { project } })

    const folder = wrapper.find('.project-folder')
    const pills = folder.findAll('button[tabindex]').map((pill) => pill.text())

    expect(pills).toEqual(['ESP32', 'Spring Boot', 'Vue 3'])
    expect(folder.find('button[aria-expanded]').attributes('aria-label')).toContain('Room Dashboard')
  })

  it('links to the live site and the source as real links that open in a new tab', () => {
    const wrapper = mount(ProjectCard, { props: { project } })

    const live = wrapper.find('a[href="https://example.com/live/"]')
    const source = wrapper.find('a[href="https://example.com/repo"]')

    expect(live.text()).toContain('View live')
    expect(source.text()).toContain('Source code')
    for (const link of [live, source]) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toContain('noopener')
    }
  })
})
