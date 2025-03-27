<script setup lang="ts">
import BaseInput, { type BaseInputProps } from './BaseInput.vue'

export interface BaseTextareaProps extends BaseInputProps<string> {
  type: 'textarea'
}

interface BaseTextareaEmit {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<BaseTextareaProps>(), { modelValue: '' })
const emit = defineEmits<BaseTextareaEmit>()

const handleValueUpdate = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseInput
    tag="textarea"
    v-bind="props"
    @update:modelValue="handleValueUpdate"
  />
</template>

<style scoped></style>
