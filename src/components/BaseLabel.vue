<script setup lang="ts">
import type { FieldProps } from './typesField.ts'

const { name, required } = defineProps<FieldProps>()
</script>

<template>
  <label
    :for="name"
    class="font-bold text-primary"
  >
    <slot></slot>
    <span
      v-if="required"
      class="text-error"
    >
      *
    </span>
  </label>
</template>

<style scoped></style>
