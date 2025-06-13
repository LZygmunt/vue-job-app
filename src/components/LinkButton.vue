<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { RouterLinkProps } from 'vue-router'

import BaseButton from './BaseButton.vue'

import type { BaseButtonProps } from './ButtonTypes.ts'

interface LinkButtonProps extends BaseButtonProps, RouterLinkProps {}

const props = withDefaults(defineProps<LinkButtonProps>(), {
  variant: 'primary',
  appearance: 'solid',
  size: 'medium',
  disabled: false,
  external: false,
})

const attrs = useAttrs()

const disabledLinkClasses = computed(() => (props.disabled ? 'pointer-events-none' : ''))
const routerLinkProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant, size, disabled, appearance, ...restProps } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: className, ...restAttrs } = attrs
  return { ...restProps, ...restAttrs }
})
</script>

<template>
  <BaseButton
    v-slot="{ class: buttonClass }"
    :variant="variant"
    :appearance="appearance"
    :size="size"
    :disabled="disabled"
    :class="[disabledLinkClasses, props.class]"
  >
    <RouterLink
      :class="buttonClass"
      :aria-disabled="disabled ? 'true' : undefined"
      v-bind="routerLinkProps"
    >
      <slot></slot>
    </RouterLink>
  </BaseButton>
</template>
