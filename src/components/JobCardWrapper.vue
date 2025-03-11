<script setup lang="ts">
import BaseCard from './BaseCard.vue'
</script>

<template>
  <BaseCard class="bg-white dark:bg-neutral-700 p-4 flex flex-col justify-between gap-4">
    <div class="flex flex-col gap-4">
      <slot name="mainDetails"></slot>
    </div>
    <div v-if="$slots.salary || $slots.footer" class="flex flex-col">
      <slot name="salary"></slot>
      <hr v-if="$slots.footer" class="my-4 border-gray-500" />
      <slot name="footer"></slot>
    </div>
  </BaseCard>
</template>

