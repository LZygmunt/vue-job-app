<script setup lang="ts">
import { computed, provide } from 'vue'

import { storeToRefs } from 'pinia'

import type { SearchParams } from '#/api/utils/utilTypes.ts'
import JobBrowseSection from '#/components/JobBrowseSection.vue'
import { useCurrentPage } from '#/composables/useCurrentPage.ts'
import { PaginationTimeoutsKey } from '#/keys.ts'
import { usePreferencesStore } from '#/store/preferences.ts'

const { currentPage } = useCurrentPage()

const searchParams = computed(
  () =>
    ({
      page: currentPage,
      perPage: 12,
    }) as unknown as SearchParams,
)

const preferencesStore = usePreferencesStore()
const { minimizeTimeout, maximizeTimeout, resetClickRegisterTimeout } =
  storeToRefs(preferencesStore)
provide(PaginationTimeoutsKey, {
  minimizeTimeout,
  maximizeTimeout,
  resetClickRegisterTimeout,
})
</script>

<template>
  <JobBrowseSection v-bind="searchParams" />
</template>

<style scoped></style>
