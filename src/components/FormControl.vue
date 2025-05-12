<script setup lang="ts">
import { computed, type InputHTMLAttributes, useAttrs } from 'vue'

import BaseCheckboxInput, { type BaseCheckboxInputProps } from './BaseCheckboxInput.vue'
import BaseLabel from './BaseLabel.vue'
import BaseNumberInput, { type BaseNumberInputProps } from './BaseNumberInput.vue'
import BaseRadioInput, { type BaseRadioInputProps } from './BaseRadioInput.vue'
import BaseSelect, { type BaseSelectInputProps } from './BaseSelect.vue'
import BaseTextarea, { type BaseTextareaProps } from './BaseTextarea.vue'
import BaseTextInput, { type BaseTextInputProps } from './BaseTextInput.vue'
import BaseToggleInput, {
  type BaseToggleInputProps,
  type ToggleOption,
} from './BaseToggleInput.vue'

type FormControlLayoutVariant = 'inline' | 'stacked'

interface FormControlProps {
  label?: string
  variant?: FormControlLayoutVariant
}

type TempTypeForToggleInputProps<TVal extends string | number = string | number> =
  BaseToggleInputProps<TVal, ToggleOption<TVal>[]>

type InputProps = FormControlProps
  & (
    | BaseTextInputProps
    | BaseNumberInputProps
    | BaseSelectInputProps
    | BaseCheckboxInputProps
    | BaseRadioInputProps
    | BaseTextareaProps
    | TempTypeForToggleInputProps
  )

const props = withDefaults(defineProps<InputProps>(), {
  fullWidth: undefined,
})
const emit = defineEmits(['update:modelValue'])
defineOptions({
  inheritAttrs: false,
})
const attrs = useAttrs() as InputHTMLAttributes

const updateValue = (value: string | number | boolean | (string | number)[]) => {
  emit('update:modelValue', value)
}

const inputPropsWithAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, variant, ...restProps } = props
  return { ...restProps, ...attrs }
})

const isTextLike = computed(() => ['text', 'password', 'email', 'tel'].includes(props.type))
const isTextarea = computed(() => props.type === 'textarea')
const isNumber = computed(() => props.type === 'number')
const isSelect = computed(() => props.type === 'select')
const isCheckbox = computed(() => props.type === 'checkbox')
const isRadio = computed(() => props.type === 'radio')
const isToggle = computed(() => props.type === 'toggle')

const actualVariant = computed(() => props.variant ?? (isCheckbox.value ? 'inline' : 'stacked'))
const actualWidth = computed(() => inputPropsWithAttrs.value.width ?? 'auto')
const wrapperClasses = computed(() =>
  actualVariant.value === 'inline' ? `grid-cols-[1fr_${actualWidth.value}] items-center` : '',
)
</script>

<template>
  <div
    class="grid gap-2 text-gray-700 dark:text-white"
    :class="wrapperClasses"
  >
    <BaseLabel
      v-if="props.label"
      :name="props.name"
      :required="props.required"
    >
      {{ props.label }}
    </BaseLabel>

    <BaseTextInput
      v-if="isTextLike"
      v-bind="inputPropsWithAttrs as BaseTextInputProps"
      @update:modelValue="updateValue"
    />

    <BaseTextarea
      v-if="isTextarea"
      v-bind="inputPropsWithAttrs as BaseTextareaProps"
      type="textarea"
      @update:modelValue="updateValue"
    />

    <BaseNumberInput
      v-if="isNumber"
      v-bind="inputPropsWithAttrs as BaseNumberInputProps"
      type="number"
      @update:modelValue="updateValue"
    />

    <BaseSelect
      v-if="isSelect"
      v-bind="inputPropsWithAttrs as BaseSelectInputProps"
      type="select"
      @update:modelValue="updateValue"
    />

    <BaseCheckboxInput
      v-if="isCheckbox"
      v-bind="inputPropsWithAttrs as BaseCheckboxInputProps"
      type="checkbox"
      @update:modelValue="updateValue"
    />

    <BaseRadioInput
      v-if="isRadio"
      v-bind="inputPropsWithAttrs as BaseRadioInputProps"
      type="radio"
      @update:modelValue="updateValue"
    />

    <BaseToggleInput
      v-if="isToggle"
      v-bind="inputPropsWithAttrs as TempTypeForToggleInputProps"
      @update:modelValue="updateValue"
    />
  </div>
</template>

<style scoped></style>
