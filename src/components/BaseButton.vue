<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <button
    class="button"
    v-bind="attrs"
  >
    <slot></slot>
  </button>
</template>

<style>
@reference '#/assets/main.css';

.button {
  @apply inline-block
  px-4
  py-2
  rounded-md
  text-neutral-900
  bg-green-500
  hover:bg-green-600
  dark:bg-green-500/60;
  &.secondary {
    @apply text-gray-100
    bg-neutral-900
    hover:bg-neutral-700
    dark:text-neutral-700
    dark:bg-gray-100
    hover:dark:bg-gray-200;
  }

  &[disabled] {
    @apply opacity-50 cursor-not-allowed;
  }
}
</style>
