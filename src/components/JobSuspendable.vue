<script setup lang="ts">
import { computed, toRefs } from 'vue'

import useGetJobs from '#/api/useGetJobs.ts'
import type { SearchParams } from '#/api/utils/utilTypes.ts'
import FloatingPagination from '#/components/FloatingPagination.vue'
import JobCard, { type JobOffer, type JobOffers } from '#/components/JobCard.vue'
import type { DeepMaybeRefOrGetter } from '#/utilityTypes.ts'

export interface JobsSuspendableProps extends SearchParams {
  disablePagination?: boolean
}

const props = defineProps<JobsSuspendableProps>()
const { disablePagination, ...searchParamsProps } = toRefs(props)

const { data, suspense } = useGetJobs({
  searchParams: searchParamsProps as DeepMaybeRefOrGetter<SearchParams>,
  select: (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jobs = data.data.map(({ company, ...item }) => item as JobOffer)

    return {
      lastPage: data.totalPages,
      jobs,
    }
  },
})

await suspense()
const jobs = computed(() => data.value?.jobs ?? ([] as JobOffers))
</script>

<template>
  <JobCard
    v-for="job in jobs"
    :key="job.id"
    v-bind="job"
  />
  <FloatingPagination
    v-if="!disablePagination && data?.lastPage"
    :lastPage="data?.lastPage"
  />
</template>

<style scoped></style>
