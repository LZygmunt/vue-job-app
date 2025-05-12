<script setup lang="ts">
import type { FieldProps } from './typesField.ts'

const { name, required } = defineProps<FieldProps>()
</script>

<template>
  <label
    :for="name"
    class="text-gray-700 dark:text-white font-bold"
  >
    <slot></slot>
    <span
      v-if="required"
      class="text-red-500"
    >
      *
    </span>
  </label>
</template>

<style scoped></style>
