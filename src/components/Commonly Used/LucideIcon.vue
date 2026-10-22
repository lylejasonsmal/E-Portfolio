<template>
  <component :is="icons[params.icon]" :size="params.size" :stroke-width="params.strokeWidth" aria-hidden="true" />
</template>
<script setup>
import { Menu, X, Mail, Package, ArrowUpRight, Linkedin } from 'lucide-vue-next'

const icons = {
  'menu': Menu,
  'x': X,
  'mail': Mail,
  'linkedin': Linkedin,
  'package': Package,
  'arrow-up-right': ArrowUpRight
}

const params = defineProps({
  icon: { type: String, required: true },
  size: { type: String, default: '30px' },
  strokeWidth: { type: Number, default: 1.25 }
})
</script>
