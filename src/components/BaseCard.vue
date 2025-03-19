<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
@reference '#/assets/main.css';

.card {
  @apply p-4
    rounded-md
    shadow-md
    shadow-white
    dark:shadow-neutral-900
    border
    border-white
    dark:border-neutral-900
    bg-white
    dark:bg-neutral-700;
}
</style>
