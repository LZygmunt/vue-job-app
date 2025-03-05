<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

interface TruncateTextProps {
  maxLines?: number
}
const { maxLines = 3 } = defineProps<TruncateTextProps>()

const isExpanded = ref(false)
const elementToClamp = useTemplateRef('truncate-text')

const isClamped = computed(() => {
  return elementToClamp.value && elementToClamp.value.scrollHeight > elementToClamp.value.clientHeight
})
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const stylesObject = computed(() =>
  isExpanded.value
    ? { '-webkit-line-clamp': 'unset' }
    : { '-webkit-line-clamp': maxLines, height: `calc(${maxLines} * 1.5em)` },
)
</script>

<template>
  <div>
    <span
      ref="truncate-text"
      class="truncate-text"
      :style="stylesObject"
    >
      <slot></slot>
    </span>
    <button
      v-if="isClamped"
      class="text-green-500 hover:text-green-600"
      @click="toggleExpanded"
    >
      {{ isExpanded ? 'Less' : 'More' }}
    </button>
  </div>
</template>

<style scoped>
.truncate-text {
  @apply line-clamp-1 !transition-all h-auto;
}
</style>
