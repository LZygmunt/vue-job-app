<script setup lang="ts">
import { computed, useSlots } from 'vue'

import { twMerge } from 'tailwind-merge'

import BaseButton from './BaseButton.vue'

import type { ButtonProps } from './ButtonTypes.ts'

interface IconButtonProps extends ButtonProps {
  srText?: string
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  variant: 'primary',
  appearance: 'text',
  size: 'medium',
  disabled: false,
  type: 'button',
  iconPosition: 'only',
  srText: '',
})

const slots = useSlots()

const iconLayoutClasses = computed(() =>
  twMerge(
    slots.startIcon && 'inline-flex gap-1.5 items-center justify-center',
    slots.endIcon && 'inline-flex gap-1.5 items-center justify-center',
    !slots.startIcon
      && !slots.endIcon
      && 'p-[0.5em] leading-none rounded-full aspect-square w-[1em] box-content [&:not([disabled])]:hover:rotate-90 [&:not([disabled])]:focus-visible:rotate-90',
    props.class,
  ),
)

const srOnlyClass = 'sr-only'
</script>

<template>
  <BaseButton
    v-slot="{ class: buttonClass }"
    :appearance="props.appearance"
    :variant="props.variant"
    :size="props.size"
    :disabled="props.disabled"
    :class="iconLayoutClasses"
  >
    <button
      :class="buttonClass"
      :type="props.type"
      :disabled="props.disabled"
      v-bind="$attrs"
    >
      <template v-if="!$slots.startIcon && !$slots.endIcon">
        <slot></slot>
        <span
          v-if="props.srText"
          :class="srOnlyClass"
        >
          {{ srText }}
        </span>
      </template>
      <template v-else>
        <slot
          name="startIcon"
          class="[&:not([disabled])]:group-hover:rotate-90 [&:not([disabled])]:group-focus-visible:rotate-90"
        ></slot>
        <span
          v-if="!$slots.startIcon && !$slots.endIcon"
          :class="srOnlyClass"
        >
          {{ srText }}
        </span>
        <span v-if="$slots.default">
          <slot
            class="[&:not([disabled])]:group-hover:rotate-90 [&:not([disabled])]:group-focus-visible:rotate-90"
          ></slot>
        </span>
        <slot
          name="endIcon"
          class="[&:not([disabled])]:group-hover:rotate-90 [&:not([disabled])]:group-focus-visible:rotate-90"
        ></slot>
      </template>
    </button>
  </BaseButton>
</template>

<style></style>
