import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AuroraBackground from '@/components/ui/AuroraBackground.vue'

describe('AuroraBackground', () => {
  it('is decorative, so screen readers skip it', () => {
    const wrapper = mount(AuroraBackground)

    expect(wrapper.find('.aurora-background').attributes('aria-hidden')).toBe('true')
  })

  it('leaves the plain page background where WebGL is unavailable', async () => {
    const wrapper = mount(AuroraBackground)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.aurora-container').exists()).toBe(false)
  })
})
