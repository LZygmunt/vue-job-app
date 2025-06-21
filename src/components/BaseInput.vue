<script setup lang="ts" generic="TVal extends string | number | boolean | (string | number)[]">
import { computed, useAttrs } from 'vue'

import type { FieldProps } from './typesField.ts'

export interface BaseInputProps<TValue extends string | number | boolean | (string | number)[]>
  extends FieldProps {
  disabled?: boolean
  modelValue: TValue
  placeholder?: string
  class?: string
  fullWidth?: boolean
}

export interface BaseInputEmit<TValue> {
  (e: 'update:modelValue', value: TValue): void
}

interface BaseInputInternalProps {
  tag?: 'input' | 'textarea' | 'select'
}

const props = withDefaults(defineProps<BaseInputProps<TVal> & BaseInputInternalProps>(), {
  name: '',
  tag: 'input',
  fullWidth: true,
})
const emit = defineEmits<BaseInputEmit<TVal>>()
const attrs = useAttrs()

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value as TVal)
}
const inputProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelValue, tag, ...restProps } = props
  return { ...restProps, ...attrs }
})
</script>

<template>
  <component
    :is="tag"
    :id="props.name"
    :value="props.modelValue"
    v-bind="inputProps"
    class="border rounded py-2 px-3 hover-focus:bg-primary-hover/25"
    :class="props.fullWidth && 'w-full'"
    @input="handleInput"
  >
    <slot></slot>
  </component>
</template>

<style scoped></style>
