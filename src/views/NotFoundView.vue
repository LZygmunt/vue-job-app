<script setup lang="ts">
import LinkButton from '#/components/LinkButton.vue'
</script>

<template>
  <section class="text-center flex flex-col justify-center items-center h-96">
    <i class="pi pi-exclamation-triangle text-warning text-7xl mb-5"></i>
    <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl mb-5">This page does not exist</p>
    <LinkButton to="/"> Go Back </LinkButton>
  </section>
</template>
