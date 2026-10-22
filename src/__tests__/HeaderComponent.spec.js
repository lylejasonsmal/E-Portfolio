import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/HeaderComponent.vue'

describe('HeaderComponent', () => {
  let wrapper

  afterEach(() => wrapper?.unmount())

  const mountHeader = () => {
    wrapper = mount(HeaderComponent, { attachTo: document.body })
    return wrapper
  }

  it('opens and closes the mobile menu from a labelled button', async () => {
    mountHeader()
    const button = wrapper.find('button[aria-controls="site-nav"]')

    await button.trigger('click')
    const openedLabel = button.attributes('aria-label')
    const openedState = button.attributes('aria-expanded')
    await button.trigger('click')

    expect(openedState).toBe('true')
    expect(openedLabel).toBe('Close menu')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(button.attributes('aria-label')).toBe('Open menu')
  })

  it('closes the mobile menu when a section link is chosen', async () => {
    mountHeader()
    const button = wrapper.find('button[aria-controls="site-nav"]')
    await button.trigger('click')

    await wrapper.find('#site-nav a[href="#projects"]').trigger('click')

    expect(button.attributes('aria-expanded')).toBe('false')
  })

  it('closes the mobile menu on Escape', async () => {
    mountHeader()
    const button = wrapper.find('button[aria-controls="site-nav"]')
    await button.trigger('click')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(button.attributes('aria-expanded')).toBe('false')
  })

  it('closes the mobile menu when the page outside the header is pressed', async () => {
    mountHeader()
    const button = wrapper.find('button[aria-controls="site-nav"]')
    await button.trigger('click')

    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(button.attributes('aria-expanded')).toBe('false')
  })

  it('makes Contact the call to action', () => {
    mountHeader()

    const callToAction = wrapper.find('#site-nav a.call-to-action')

    expect(callToAction.attributes('href')).toBe('#contact')
  })
})
