<script setup lang="ts">
import type { SearchParams } from '#/api/utils/utilTypes.ts'
import { computed } from 'vue'
import useGetJobs from '#/api/useGetJobs.ts'
import JobBrowseSection from '#/components/JobBrowseSection.vue'
import FloatingPagination from '#/components/FloatingPagination.vue'
import { useCurrentPage } from '#/composables/useCurrentPage.ts'

const { currentPage } = useCurrentPage()

const searchParams = computed(
  () =>
    ({
      page: currentPage,
      perPage: 12,
    }) as unknown as SearchParams,
)

const { data } = useGetJobs({ searchParams })
</script>

<template>
  <JobBrowseSection v-bind="searchParams" />
  <FloatingPagination :lastPage="data?.totalPages" />
</template>

<style scoped></style>
