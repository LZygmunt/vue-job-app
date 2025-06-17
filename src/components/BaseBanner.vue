<script setup lang="ts">
interface BaseBannerProps {
  title: string
  desc: string
}
const { title, desc } = defineProps<BaseBannerProps>()
</script>
<template>
  <div class="flex flex-col items-center justify-center p-16">
    <span class="text-6xl font-semibold p-4">
      {{ title }}
    </span>
    <span class="text-xl">{{ desc }}</span>
  </div>
</template>
