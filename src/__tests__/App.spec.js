import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { sections } from '@/content/sections.js'

describe('App', () => {
  it('has exactly one h1, naming Lyle', () => {
    const wrapper = mount(App)

    const headings = wrapper.findAll('h1')

    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toContain('Lyle')
  })

  it('keeps the name as real h1 text while the interactive wordmark draws it, hidden from screen readers', () => {
    const wrapper = mount(App)

    const wordmark = wrapper.find('.introduction [aria-hidden="true"] [role="img"]')

    expect(wrapper.find('h1').text()).toBe('Lyle Smal')
    expect(wordmark.attributes('aria-label')).toBe('Lyle Smal')
    expect(wordmark.find('canvas').exists()).toBe(true)
  })

  it('shows Lyle\'s portrait in the introduction, loaded first and described for search and screen readers', () => {
    const wrapper = mount(App)

    const portrait = wrapper.find('.introduction img.portrait')

    expect(portrait.attributes('alt')).toBe('Portrait of Lyle Smal')
    expect(portrait.attributes('fetchpriority')).toBe('high')
    expect(portrait.attributes('width')).toBe('400')
    expect(portrait.attributes('height')).toBe('400')
  })

  it('states Lyle\'s role and experience under the name', () => {
    const wrapper = mount(App)

    expect(wrapper.find('.introduction .tagline').text()).toBe('Software Developer | 1+ Years Experience')
  })

  it('runs the skills strip above the Tools & Skills heading', () => {
    const wrapper = mount(App)

    const children = [...wrapper.find('section#skills').element.children]
    const strip = children.findIndex((child) => child.classList.contains('skills-loop'))
    const heading = children.findIndex((child) => child.tagName === 'H2')

    expect(strip).toBeGreaterThanOrEqual(0)
    expect(strip).toBeLessThan(heading)
  })

  it('renders every section with an id and an h2 that labels it', () => {
    const wrapper = mount(App)

    for (const section of sections) {
      const element = wrapper.find(`section#${section.id}`)
      const heading = element.find('h2')

      expect(heading.text()).toBe(section.title)
      expect(element.attributes('aria-labelledby')).toBe(heading.attributes('id'))
    }
  })

  it('links the header nav to every section', () => {
    const wrapper = mount(App)

    const hrefs = wrapper.findAll('header nav a').map((link) => link.attributes('href'))

    expect(hrefs).toEqual(sections.map((section) => `#${section.id}`))
  })

  it('gives every image alt text', () => {
    const wrapper = mount(App)

    const images = wrapper.findAll('img')

    expect(images.length).toBeGreaterThan(0)
    for (const image of images) expect(image.attributes('alt')).toBeTruthy()
  })
})
