<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import BaseNavbar from './components/BaseNavbar.vue'
</script>

<template>
  <BaseNavbar />
  <RouterView />
  <VueQueryDevtools />
</template>

<style scoped></style>
