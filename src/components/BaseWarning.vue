<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { type ClassNameValue, twMerge } from 'tailwind-merge'

const { class: className, ...attrs } = useAttrs()

const wrapperClass = computed(() =>
  twMerge('text-center flex flex-col justify-center items-center', className as ClassNameValue),
)
</script>

<template>
  <section
    :class="wrapperClass"
    v-bind="attrs"
  >
    <i class="pi pi-exclamation-triangle text-warning text-7xl mb-5"></i>
    <slot name="default" />
    <slot name="button" />
  </section>
</template>
