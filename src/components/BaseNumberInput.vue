<script setup lang="ts">
import BaseInput, { type BaseInputProps } from './BaseInput.vue'

export interface BaseNumberInputProps extends BaseInputProps<number> {
  type: 'number'
  min?: number
  max?: number
  step?: number
}

interface BaseTextInputEmit {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<BaseNumberInputProps>()
const emit = defineEmits<BaseTextInputEmit>()

const handleValueUpdate = (value: number) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseInput
    v-bind="props"
    @update:modelValue="handleValueUpdate"
  />
</template>

<style scoped></style>
