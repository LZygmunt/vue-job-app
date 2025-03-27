<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Options } from './typesField.ts'
import BaseInput, { type BaseInputProps } from './BaseInput.vue'

type Value = string | number | (string | number)[]

export interface BaseSelectInputProps extends BaseInputProps<Value> {
  type: 'select'
  options: Options
  multiple?: boolean
}

interface BaseSelectEmit {
  (e: 'update:modelValue', value: Value): void
}

const props = withDefaults(defineProps<BaseSelectInputProps>(), { options: () => [] as Options })
const emit = defineEmits<BaseSelectEmit>()
const attrs = useAttrs()

const handleValueUpdate = (value: Value) => {
  emit('update:modelValue', value)
}
const selectProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { options, type, ...restProps } = props
  return restProps
})
</script>

<template>
  <BaseInput
    v-bind="{ ...selectProps, ...attrs }"
    tag="select"
    class="input"
    @update:modelValue="handleValueUpdate"
  >
    <option
      v-if="props.placeholder"
      value=""
      disabled
      selected
    >
      {{ props.placeholder }}
    </option>
    <option
      v-for="option in props.options"
      :key="`${props.name}-${option.value}`"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </BaseInput>
</template>

<style scoped></style>
