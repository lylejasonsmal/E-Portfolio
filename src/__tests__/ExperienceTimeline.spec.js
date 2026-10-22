import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperienceTimeline from '@/components/ExperienceTimeline.vue'

const roles = [
  { id: 'intern', title: 'Software Developer Intern', company: 'Onsight', companyUrl: 'https://example.com', start: '2025-07', end: '2025-12', summary: 'Learning.' },
  { id: 'developer', title: 'Software Developer', company: 'Onsight', companyUrl: 'https://example.com', start: '2026-01', end: null, summary: 'Building.' }
]

describe('ExperienceTimeline', () => {
  it('lists the roles oldest first, each titled in an h3', () => {
    const wrapper = mount(ExperienceTimeline, { props: { roles } })

    const titles = wrapper.findAll('ol > li h3').map((title) => title.text())

    expect(titles).toEqual(['Software Developer Intern', 'Software Developer'])
  })

  it('marks the dates up as machine-readable times', () => {
    const wrapper = mount(ExperienceTimeline, { props: { roles } })

    const [intern, developer] = wrapper.findAll('ol > li')

    expect(intern.findAll('time').map((time) => time.attributes('datetime'))).toEqual(['2025-07', '2025-12'])
    expect(intern.find('.dates').text()).toBe('Jul 2025 – Dec 2025')
    expect(developer.findAll('time').map((time) => time.attributes('datetime'))).toEqual(['2026-01'])
    expect(developer.find('.dates').text()).toBe('Jan 2026 – Present')
  })

  it('links the company and keeps the winding line out of the accessibility tree', () => {
    const wrapper = mount(ExperienceTimeline, { props: { roles } })

    const company = wrapper.find('ol > li .company a')

    expect(company.text()).toBe('Onsight')
    expect(company.attributes('href')).toBe('https://example.com')
    expect(wrapper.find('svg.path').attributes('aria-hidden')).toBe('true')
  })
})
