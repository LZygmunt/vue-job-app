<script setup lang="ts">
import { computed, useSlots } from 'vue'

import { twMerge } from 'tailwind-merge'

import BaseButton from './BaseButton.vue'

import type { ButtonProps } from './ButtonTypes.ts'

interface IconButtonProps extends ButtonProps {
  srText?: string
  disableRotation?: boolean | 'endIcon' | 'startIcon' | 'default' | 'icons'
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  variant: 'primary',
  appearance: 'text',
  size: 'medium',
  disabled: false,
  type: 'button',
  iconPosition: 'only',
  srText: '',
  disableRotation: false,
})

const slots = useSlots()

const iconLayoutClasses = computed(() =>
  twMerge(
    slots.startIcon && 'inline-flex gap-1.5 items-center justify-center',
    slots.endIcon && 'inline-flex gap-1.5 items-center justify-center',
    !slots.startIcon
      && !slots.endIcon
      && 'p-[0.5em] leading-none rounded-full aspect-square w-[1em] box-content',
    [false, 'startIcon', 'endIcon', 'icons'].includes(props.disableRotation)
      && '[&:not([disabled])]:hover-focus:rotate-90',
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
          :class="
            [false, 'default', 'endIcon'].includes(props.disableRotation)
            && '[&:not([disabled])]:group-hover-focus:rotate-90'
          "
        ></slot>
        <span
          v-if="!$slots.startIcon && !$slots.endIcon"
          :class="srOnlyClass"
        >
          {{ srText }}
        </span>
        <slot
          :class="
            [false, 'startIcon', 'endIcon', 'icons'].includes(props.disableRotation)
            && '[&:not([disabled])]:group-hover-focus:rotate-90'
          "
        ></slot>
        <slot
          name="endIcon"
          :class="
            [false, 'default', 'startIcon'].includes(props.disableRotation)
            && '[&:not([disabled])]:group-hover-focus:rotate-90'
          "
        ></slot>
      </template>
    </button>
  </BaseButton>
</template>

<style></style>
