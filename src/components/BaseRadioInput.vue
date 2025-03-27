<script setup lang="ts">
import type { Options } from './typesField.ts'
import BaseInput, { type BaseInputProps } from './BaseInput.vue'

type Value = string | number

export interface BaseRadioInputProps extends BaseInputProps<Value> {
  type: 'radio'
  options: Options
}
interface BaseRadioInputEmit {
  (e: 'update:modelValue', value: Value): void
}

const props = withDefaults(defineProps<BaseRadioInputProps>(), { options: () => [] as Options })
const emit = defineEmits<BaseRadioInputEmit>()

const handleValueUpdate = (value: Value) => {
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
