<script setup lang="ts">
import BaseInput, { type BaseInputProps } from './BaseInput.vue'

export interface BaseCheckboxInputProps extends BaseInputProps<boolean> {
  type: 'checkbox'
}

interface BaseCheckboxInputEmit {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<BaseCheckboxInputProps>(), {
  fullWidth: false,
})
const emit = defineEmits<BaseCheckboxInputEmit>()

const handleValueUpdate = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseInput
    class="inline"
    v-bind="props"
    @update:modelValue="handleValueUpdate"
  />
</template>

<style scoped></style>
