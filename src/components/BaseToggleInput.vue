<script
  setup
  lang="ts"
  generic="TVal extends string | number, TOptions extends ToggleOption<TVal>[]"
>
import { computed } from 'vue'

import { twMerge } from 'tailwind-merge'

import type { BaseInputProps } from './BaseInput.vue'
import type { Option } from './typesField.ts'

export type ToggleOption<TValue extends string | number> = Option<TValue> & {
  icon?: string
  label?: string
}

export interface BaseToggleInputProps<
  TVal extends string | number,
  TOptions extends ToggleOption<TVal>[],
> extends BaseInputProps<TVal> {
  options: TOptions
  type: 'toggle'
}

export interface BaseToggleInputEmit<TValue> {
  (e: 'update:modelValue', value: TValue): void
}

const props = withDefaults(defineProps<BaseToggleInputProps<TVal, TOptions>>(), {
  fullWidth: true,
})

const emit = defineEmits<BaseToggleInputEmit<TVal>>()

const handleToggle = (value: TVal) => {
  emit('update:modelValue', value)
}

const containerClass = computed(() => twMerge('flex items-center', props.fullWidth && 'w-full'))
const toggleButtonClass = computed(
  () => (option: ToggleOption<TVal>, index: number) =>
    twMerge(
      'relative flex items-center justify-center px-2.5 py-2 transition-all hover:opacity-80 focus:outline-none focus:ring-2 border overflow-hidden',
      props.modelValue === option && 'z-1',
      props.modelValue !== option && 'z-0',
      index === 0 && 'first:rounded-l-md',
      index === props.options.length - 1 && 'last:rounded-r-md',
    ),
)
const labelClass = computed(
  () => (option: ToggleOption<TVal>) =>
    twMerge(
      'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
      props.modelValue !== option && 'max-w-0 opacity-0',
      props.modelValue === option && 'max-w-xs opacity-100 pl-2',
    ),
)
</script>

<template>
  <div :class="containerClass">
    <button
      v-for="(option, index) in props.options"
      :key="String(option.value)"
      :class="toggleButtonClass(option.value, index)"
      :title="option.label"
      @click="handleToggle(option.value)"
    >
      <i
        v-if="option.icon"
        :class="option.icon"
      />

      <span :class="labelClass(option.value)">{{ option.label }}</span>
    </button>
  </div>
</template>

<style scoped></style>
