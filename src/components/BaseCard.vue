<script setup lang="ts">
import { useAttrs } from 'vue'
import { computed } from 'vue'

import { type ClassNameValue, twMerge } from 'tailwind-merge'

const { class: className, ...attrs } = useAttrs()

const cardClass = computed(() =>
  twMerge('p-4 rounded-md shadow-md border bg-surface-dark/20', className as ClassNameValue),
)
</script>

<template>
  <div
    :class="cardClass"
    v-bind="attrs"
  >
    <slot></slot>
  </div>
</template>
