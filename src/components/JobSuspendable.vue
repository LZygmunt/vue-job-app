<script setup lang="ts">
import { computed, toRefs } from 'vue'

import useGetJobs from '#/api/useGetJobs.ts'
import type { SearchParams } from '#/api/utils/utilTypes.ts'
import FloatingPagination from '#/components/FloatingPagination.vue'
import JobCard, { type JobOffer, type JobOffers } from '#/components/JobCard.vue'
import type { DeepMaybeRefOrGetter } from '#/utilityTypes.ts'

import BaseWarning from './BaseWarning.vue'
import Button from './Button.vue'

export interface JobsSuspendableProps extends SearchParams {
  disablePagination?: boolean
}

const props = defineProps<JobsSuspendableProps>()
const { disablePagination, ...searchParamsProps } = toRefs(props)

const { data, suspense, isError } = useGetJobs({
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

const onRefresh = () => {
  window.location.reload()
}
</script>

<template>
  <JobCard
    v-for="job in jobs"
    :key="job.id"
    v-bind="job"
  />
  <BaseWarning
    v-if="isError"
    class="col-span-3"
  >
    <h1 class="text-6xl font-bold mb-4">Something gone wrong</h1>
    <p class="text-info text-xl mb-5">
      Please refresh page. If still display nothing, try again later
    </p>
    <template #button>
      <Button @click="onRefresh">Refresh</Button>
    </template>
  </BaseWarning>
  <FloatingPagination
    v-if="!disablePagination && data?.lastPage"
    :lastPage="data?.lastPage"
  />
</template>

<style scoped></style>
