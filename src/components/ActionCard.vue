<script setup lang="ts">
import { reactive } from 'vue'
import BaseCard from './BaseCard.vue'

interface ActionCardProps {
  title: string
  description: string
  redirectLabel: string
  redirectTo: string
  variant?: 'primary' | 'secondary'
  class?: string
}
const {
  title,
  description,
  redirectLabel,
  redirectTo,
  variant = 'primary',
  class: className,
} = defineProps<ActionCardProps>()
const baseCardClass = reactive(['base-card', { 'base-card--secondary': variant === 'secondary' }, className])
</script>

<template>
  <BaseCard :class="baseCardClass">
    <h2>{{ title }}</h2>
    <span>{{ description }}</span>
    <RouterLink :to="redirectTo">{{ redirectLabel }}</RouterLink>
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

  & a {
    @apply px-4
      py-2
      mt-2
      rounded-md
      text-neutral-900
      bg-green-500
      dark:bg-green-500/60;
  }
  &.base-card--secondary {
    @apply bg-gray-100 dark:bg-neutral-700;

    & a {
      @apply text-gray-100 bg-neutral-900 dark:text-neutral-700 dark:bg-gray-100;
    }
  }
}
</style>
