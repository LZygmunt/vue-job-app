<script setup lang="ts">
import { useAttrs } from 'vue'
import BaseInput, { type BaseInputProps } from './BaseInput.vue'

export interface BaseTextInputProps extends BaseInputProps<string> {
  type: 'text' | 'password' | 'email' | 'tel'
  maxLength?: number
  minLength?: number
  pattern?: string
}

interface BaseTextInputEmit {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<BaseTextInputProps>()
const emit = defineEmits<BaseTextInputEmit>()
const attrs = useAttrs()

const handleValueUpdate = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseInput
    v-bind="{ ...props, ...attrs }"
    @update:modelValue="handleValueUpdate"
  />
</template>

<style scoped></style>
