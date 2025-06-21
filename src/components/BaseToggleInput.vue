<script
  setup
  lang="ts"
  generic="TVal extends string | number, TOptions extends ToggleOption<TVal>[]"
>
import { computed } from 'vue'

import { twMerge } from 'tailwind-merge'

import Button from './Button.vue'
import IconButton from './IconButton.vue'

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
      'relative flex items-center justify-center px-2.5 py-2 transition-all rounded-none overflow-hidden border-lr-none gap-0',
      props.modelValue === option.value ? 'z-1 light:bg-primary/20' : 'z-0 text-inherit',
      index === 0 && 'first:rounded-l-md',
      index === props.options.length - 1 && 'last:rounded-r-md',
    ),
)
const labelClass = computed(
  () => (option: ToggleOption<TVal>) =>
    twMerge(
      'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
      props.modelValue === option.value ? 'max-w-xs opacity-100 pl-2' : 'max-w-0 opacity-0',
    ),
)
</script>

<template>
  <div :class="containerClass">
    <IconButton
      v-for="(option, index) in props.options"
      :key="String(option.value)"
      :class="toggleButtonClass(option, index)"
      :title="option.label"
      appearance="outline"
      disableRotation
      @click="handleToggle(option.value)"
    >
      <template #startIcon>
        <i
          v-if="option.icon"
          :class="option.icon"
        />
      </template>
      <span :class="labelClass(option)">{{ option.label }}</span>
    </IconButton>
  </div>
</template>

<style scoped></style>
