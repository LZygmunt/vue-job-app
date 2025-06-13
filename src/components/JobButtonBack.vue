<script setup lang="ts">
import { useRouter } from 'vue-router'

import Button from './Button.vue'

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
  <Button
    class="rounded-t-none border border-t-0 shadow-md"
    appearance="outline"
    @click="goBack"
  >
    Go back
  </Button>
</template>
