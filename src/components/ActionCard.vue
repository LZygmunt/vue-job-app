<script setup lang="ts">
import { computed } from 'vue'

import { twMerge } from 'tailwind-merge'

import BaseCard from './BaseCard.vue'

interface ActionCardProps {
  title: string
  description: string
  variant?: 'primary' | 'secondary'
  class?: string
}
const { title, description, variant = 'primary', class: className } = defineProps<ActionCardProps>()
const baseCardClass = computed(() =>
  twMerge(
    'flex flex-col items-start gap-2',
    (!variant || variant === 'primary') && 'bg-primary/20',
    variant === 'secondary' && 'bg-secondary/20 dark:text-on-secondary text-secondary',
    className,
  ),
)
</script>

<template>
  <BaseCard :class="baseCardClass">
    <h2>{{ title }}</h2>
    <span>{{ description }}</span>
    <slot></slot>
  </BaseCard>
</template>
