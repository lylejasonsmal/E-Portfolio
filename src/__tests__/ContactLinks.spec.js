import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactLinks from '@/components/ContactLinks.vue'

const contact = { email: 'someone@example.com', linkedInUrl: 'https://www.linkedin.com/in/someone/' }

describe('ContactLinks', () => {
  it('opens an email to Lyle', () => {
    const wrapper = mount(ContactLinks, { props: { contact } })

    const email = wrapper.find('a[href^="mailto:"]')

    expect(email.attributes('href')).toBe('mailto:someone@example.com')
    expect(email.text()).toContain('someone@example.com')
  })

  it('links to LinkedIn in a new tab', () => {
    const wrapper = mount(ContactLinks, { props: { contact } })

    const linkedIn = wrapper.find('a[href="https://www.linkedin.com/in/someone/"]')

    expect(linkedIn.text()).toContain('LinkedIn')
    expect(linkedIn.attributes('target')).toBe('_blank')
    expect(linkedIn.attributes('rel')).toContain('noopener')
  })
})
