<script setup lang="ts">
import { reactive } from 'vue'
import type { RouterLinkProps } from 'vue-router'

interface BaseLinkButtonProps extends RouterLinkProps {
  variant?: 'primary' | 'secondary'
}
const { variant = 'primary', ...routerLinkProps } = defineProps<BaseLinkButtonProps>()
const redirectButtonClass = reactive([{ secondary: variant === 'secondary' }])
</script>

<template>
  <RouterLink
    :class="redirectButtonClass"
    v-bind="routerLinkProps"
  >
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
@reference '#/assets/main.css';

a {
  @apply inline-block
  px-4
  py-2
  rounded-md
  text-neutral-900
  bg-green-500
  hover:bg-green-600
  dark:bg-green-500/60;
}
a.secondary {
  @apply text-gray-100
  bg-neutral-900
  hover:bg-neutral-700
  dark:text-neutral-700
  dark:bg-gray-100
  hover:dark:bg-gray-200;
}
</style>
