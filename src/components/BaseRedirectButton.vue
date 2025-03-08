<script setup lang="ts">
import { reactive } from 'vue'

interface BaseRedirectButtonProps {
  redirectTo: string
  variant?: 'primary' | 'secondary'
  class?: string
}
const { redirectTo, variant = 'primary', class: className } = defineProps<BaseRedirectButtonProps>()
const redirectButtonClass = reactive([{ secondary: variant === 'secondary' }, className])
</script>

<template>
  <RouterLink
    :to="redirectTo"
    :class="redirectButtonClass"
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
