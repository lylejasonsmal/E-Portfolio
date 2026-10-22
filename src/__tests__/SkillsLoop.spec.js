import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillsLoop from '@/components/ui/SkillsLoop.vue'

const skills = [
  { name: 'Java' },
  { name: 'Vue.js', icon: { title: 'Vue.js', path: 'M0 0h24v24H0z' } },
  { name: 'Claude', icon: { title: 'Claude', path: 'M0 0h24v24H0z' } }
]

const readableList = (wrapper) => wrapper.find('ul:not([aria-hidden="true"])')

describe('SkillsLoop', () => {
  it('shows only skills that have a logo', () => {
    const wrapper = mount(SkillsLoop, { props: { skills } })

    expect(readableList(wrapper).findAll('li')).toHaveLength(2)
  })

  it('names each logo for screen readers and search engines, since no text is shown', () => {
    const wrapper = mount(SkillsLoop, { props: { skills } })

    const logos = readableList(wrapper).findAll('svg')

    expect(logos.map((logo) => logo.attributes('role'))).toEqual(['img', 'img'])
    expect(logos.map((logo) => logo.attributes('aria-label'))).toEqual(['Vue.js', 'Claude'])
    expect(logos.map((logo) => logo.find('title').text())).toEqual(['Vue.js', 'Claude'])
  })

  it('separates the logos with a bar that screen readers skip', () => {
    const wrapper = mount(SkillsLoop, { props: { skills } })

    const separators = readableList(wrapper).findAll('.separator')

    expect(separators).toHaveLength(2)
    for (const separator of separators) {
      expect(separator.text()).toBe('|')
      expect(separator.attributes('aria-hidden')).toBe('true')
    }
  })
})
