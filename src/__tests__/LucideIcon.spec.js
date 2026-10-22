import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LucideIcon from '@/components/Commonly Used/LucideIcon.vue'

describe('LucideIcon', () => {
  it('renders the named icon at the given size and stroke width', () => {
    const wrapper = mount(LucideIcon, { props: { icon: 'menu', size: '24px' } })

    const svg = wrapper.find('svg')

    expect(svg.classes()).toContain('lucide-menu')
    expect(svg.attributes('width')).toBe('24px')
    expect(svg.attributes('stroke-width')).toBe('1.25')
  })

  it('hides the icon from screen readers, leaving the label to the text beside it', () => {
    const wrapper = mount(LucideIcon, { props: { icon: 'mail' } })

    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
  })
})
