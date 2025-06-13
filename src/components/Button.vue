<script setup lang="ts">
import BaseButton from './BaseButton.vue'

import type { ButtonProps } from './ButtonTypes.ts'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
})
</script>

<template>
  <BaseButton
    v-slot="{ class: buttonClass }"
    v-bind="props"
  >
    <button
      :class="buttonClass"
      :type="props.type"
      :disabled="props.disabled"
      v-bind="$attrs"
    >
      <slot></slot>
    </button>
  </BaseButton>
</template>
