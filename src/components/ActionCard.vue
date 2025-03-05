<script setup lang="ts">
import { reactive } from 'vue'
import BaseCard from './BaseCard.vue'

interface ActionCardProps {
  title: string
  description: string
  variant?: 'primary' | 'secondary'
  class?: string
}
const { title, description, variant = 'primary', class: className } = defineProps<ActionCardProps>()
const baseCardClass = reactive(['base-card', { 'base-card--secondary': variant === 'secondary' }, className])
</script>

<template>
  <BaseCard :class="baseCardClass">
    <h2>{{ title }}</h2>
    <span>{{ description }}</span>
    <slot></slot>
  </BaseCard>
</template>

<style scoped>
@reference '#/assets/main.css';

.base-card {
  @apply flex
    flex-col
    items-start
    gap-2
    text-neutral-900
    bg-green-500/20
    dark:bg-green-300/20
    dark:text-neutral-50;

  &.base-card--secondary {
    @apply bg-gray-100 dark:bg-neutral-700;
  }
}
</style>
