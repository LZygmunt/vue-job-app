<script setup lang="ts">
import BaseWarning from '#/components/BaseWarning.vue'
import LinkButton from '#/components/LinkButton.vue'
</script>

<template>
  <BaseWarning class="h-96">
    <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl mb-5">This page does not exist</p>
    <template #button>
      <LinkButton to="/"> Go Back</LinkButton>
    </template>
  </BaseWarning>
</template>
