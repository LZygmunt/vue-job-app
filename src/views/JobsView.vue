<script setup lang="ts">
import { computed } from 'vue'

import type { SearchParams } from '#/api/utils/utilTypes.ts'
import JobBrowseSection from '#/components/JobBrowseSection.vue'
import { useCurrentPage } from '#/composables/useCurrentPage.ts'

const { currentPage } = useCurrentPage()

const searchParams = computed(
  () =>
    ({
      page: currentPage,
      perPage: 12,
    }) as unknown as SearchParams,
)
</script>

<template>
  <JobBrowseSection v-bind="searchParams" />
</template>

<style scoped></style>
