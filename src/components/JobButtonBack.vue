<script setup lang="ts">
import { useRouter } from 'vue-router'

import { usePreferencesStore } from '#/store/preferences.ts'

import Button from './Button.vue'

const router = useRouter()

const goBack = () => {
  if (router.options.history.state.back) {
    router.push(router.options.history.state.back as string)
    return
  }
  router.push(`/jobs`)
}

const preferencesStore = usePreferencesStore()
</script>

<template>
  <Button
    class="rounded-t-none border-t-0 shadow-md bg-secondary/20 dark:bg-primary/20"
    :variant="preferencesStore.themeMode === 'light' ? 'secondary' : 'primary'"
    appearance="outline"
    @click="goBack"
  >
    Go back
  </Button>
</template>
