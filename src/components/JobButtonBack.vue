<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'

const router = useRouter()

const goBack = () => {
  if (router.options.history.state.back) {
    router.push(router.options.history.state.back as string)
    return
  }
  router.push(`/jobs`)
}
</script>

<template>
  <BaseButton
    class="job-back-button"
    @click="goBack"
  >
    Go back
  </BaseButton>
</template>

<style scoped>
@reference '#/assets/main.css';

.job-back-button {
  @apply rounded-t-none
    border
    border-t-0
    border-green-500 shadow-md
    shadow-green-500/50
    text-neutral-50
    bg-green-700
    dark:text-green-500
    dark:bg-neutral-900;
}
</style>
