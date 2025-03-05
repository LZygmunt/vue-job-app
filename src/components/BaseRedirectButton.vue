<script setup lang="ts">
import { reactive } from 'vue'

interface BaseRedirectButtonProps {
  label: string
  redirectTo: string
  variant?: 'primary' | 'secondary'
  class?: string
}
const { label, redirectTo, variant = 'primary', class: className } = defineProps<BaseRedirectButtonProps>()
const redirectButtonClass = reactive([{ secondary: variant === 'secondary' }, className])
</script>

<template>
  <RouterLink
    :to="redirectTo"
    :class="redirectButtonClass"
  >
    {{ label }}
  </RouterLink>
</template>

<style scoped>
@reference '#/assets/main.css';

a {
  @apply px-4
  py-2
  mt-2
  rounded-md
  text-neutral-900
  bg-green-500
  dark:bg-green-500/60;
}
a.secondary {
  @apply text-gray-100 bg-neutral-900 dark:text-neutral-700 dark:bg-gray-100;
}
</style>
