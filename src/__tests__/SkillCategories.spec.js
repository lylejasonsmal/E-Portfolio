import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillCategories from '@/components/SkillCategories.vue'

const categories = ['Frontend', 'Backend', 'Hardware']
const skills = [
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Java', category: 'Backend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'ESP32', category: 'Hardware' }
]

describe('SkillCategories', () => {
  it('gives each category its own h3, in the order given', () => {
    const wrapper = mount(SkillCategories, { props: { categories, skills } })

    expect(wrapper.findAll('h3').map((heading) => heading.text())).toEqual(['Frontend', 'Backend', 'Hardware'])
  })

  it('lists each skill under its own category', () => {
    const wrapper = mount(SkillCategories, { props: { categories, skills } })

    const lists = wrapper.findAll('.category').map((category) => category.findAll('li').map((item) => item.text()))

    expect(lists).toEqual([['Vue.js', 'CSS'], ['Java'], ['ESP32']])
  })
})
