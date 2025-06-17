<script setup lang="ts">
import { computed } from 'vue'

import { twMerge } from 'tailwind-merge'

import type { BaseButtonProps } from './ButtonTypes.ts'

const buttonProps = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  appearance: 'solid',
  size: 'medium',
  disabled: false,
})

const isSolid = (appearance?: BaseButtonProps['appearance']) =>
  appearance === undefined || appearance === 'solid'
const isOutline = (appearance?: BaseButtonProps['appearance']) => appearance === 'outline'
const isText = (appearance?: BaseButtonProps['appearance']) => appearance === 'text'

const isPrimary = (variant?: BaseButtonProps['variant']) =>
  variant === undefined || variant === 'primary'
const isSecondary = (variant?: BaseButtonProps['variant']) => variant === 'secondary'
const isSuccess = (variant?: BaseButtonProps['variant']) => variant === 'success'
const isWarning = (variant?: BaseButtonProps['variant']) => variant === 'warning'
const isInfo = (variant?: BaseButtonProps['variant']) => variant === 'info'
const isDanger = (variant?: BaseButtonProps['variant']) => variant === 'danger'

const buttonClasses = computed(() =>
  twMerge(
    'inline-block rounded-md transition-transform duration-200 ease-in-out group',
    buttonProps.size === 'small' && 'px-2 py-1 text-sm',
    buttonProps.size === 'medium' && 'px-4 py-2 text-base',
    buttonProps.size === 'large' && 'px-6 py-3 text-lg',
    isSolid(buttonProps.appearance)
      && isPrimary(buttonProps.variant)
      && 'bg-primary text-on-primary hover-focus:bg-primary-hover',
    isSolid(buttonProps.appearance)
      && isSecondary(buttonProps.variant)
      && 'bg-secondary text-on-secondary hover-focus:bg-secondary-hover',
    isSolid(buttonProps.appearance)
      && isSuccess(buttonProps.variant)
      && 'bg-success text-on-success hover-focus:bg-success-hover',
    isSolid(buttonProps.appearance)
      && isDanger(buttonProps.variant)
      && 'bg-error text-on-error hover-focus:bg-error-hover',
    isSolid(buttonProps.appearance)
      && isWarning(buttonProps.variant)
      && 'bg-warning text-on-warning hover-focus:bg-warning-hover',
    isSolid(buttonProps.appearance)
      && isInfo(buttonProps.variant)
      && 'bg-info text-on-info hover-focus:bg-info-hover',
    isOutline(buttonProps.appearance) && 'bg-transparent border-1',
    isOutline(buttonProps.appearance)
      && isPrimary(buttonProps.variant)
      && 'border text-primary hover-focus:bg-primary-hover/25',
    isOutline(buttonProps.appearance)
      && isSecondary(buttonProps.variant)
      && 'border text-secondary hover-focus:bg-secondary-hover/25',
    isOutline(buttonProps.appearance)
      && isSuccess(buttonProps.variant)
      && 'border text-success hover-focus:bg-success-hover/25',
    isOutline(buttonProps.appearance)
      && isDanger(buttonProps.variant)
      && 'border text-error hover-focus:bg-error-hover/25',
    isOutline(buttonProps.appearance)
      && isWarning(buttonProps.variant)
      && 'border text-warning hover-focus:bg-warning-hover/25',
    isOutline(buttonProps.appearance)
      && isInfo(buttonProps.variant)
      && 'border text-info hover-focus:bg-info-hover/25',
    isText(buttonProps.appearance) && 'bg-transparent',
    isText(buttonProps.appearance)
      && isPrimary(buttonProps.variant)
      && 'text-primary hover-focus:bg-primary-hover/25',
    isText(buttonProps.appearance)
      && isSecondary(buttonProps.variant)
      && 'text-secondary hover-focus:bg-secondary-hover/25',
    isText(buttonProps.appearance)
      && isSuccess(buttonProps.variant)
      && 'text-success hover-focus:bg-success-hover/25',
    isText(buttonProps.appearance)
      && isDanger(buttonProps.variant)
      && 'text-error hover-focus:bg-error-hover/25',
    isText(buttonProps.appearance)
      && isWarning(buttonProps.variant)
      && 'text-warning hover-focus:bg-warning-hover/25',
    isText(buttonProps.appearance)
      && isInfo(buttonProps.variant)
      && 'text-info hover-focus:bg-info-hover/25',
    buttonProps.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    buttonProps.class,
  ),
)
</script>

<template>
  <slot :class="buttonClasses"></slot>
</template>
