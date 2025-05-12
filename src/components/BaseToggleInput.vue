<script
  setup
  lang="ts"
  generic="TVal extends string | number, TOptions extends ToggleOption<TVal>[]"
>
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
</script>

<template>
  <div
    class="flex items-center"
    :class="{ 'w-full': fullWidth }"
  >
    <button
      v-for="(option, index) in props.options"
      :key="String(option.value)"
      class="relative flex items-center justify-center px-2.5 py-2 transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500 border overflow-hidden"
      :class="{
        'text-green-500 dark:bg-neutral-900 z-1': modelValue === option.value,
        'z-0': modelValue !== option.value,
        'first:rounded-l-md': index === 0,
        'last:rounded-r-md': index === props.options.length - 1,
      }"
      :title="option.label"
      @click="handleToggle(option.value)"
    >
      <i
        v-if="option.icon"
        :class="option.icon"
      ></i>

      <span
        class="transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap"
        :class="{
          'max-w-0 opacity-0': modelValue !== option.value,
          'max-w-xs opacity-100 pl-2': modelValue === option.value,
        }"
      >
        {{ option.label }}
      </span>
    </button>
  </div>
</template>

<style scoped></style>
