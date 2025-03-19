<script setup lang="ts">
import type { SearchParams } from '#/api/utils/utilTypes.ts'
import { computed } from 'vue'
import useGetJobs from '#/api/useGetJobs.ts'
import JobCard, { type JobOffer, type JobOffers } from '#/components/JobCard.vue'

const searchParamsProps = defineProps<SearchParams>()

const { data, suspense } = useGetJobs({
  searchParams: searchParamsProps,
  select: (data) => {
    const jobs = Array.isArray(data) ? data : data.data

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return jobs.map(({ company, ...item }) => item as JobOffer)
  },
})

await suspense()
const jobs = computed(() => data.value ?? ([] as JobOffers))
</script>

<template>
  <JobCard
    v-for="job in jobs"
    :key="job.id"
    v-bind="job"
  />
</template>

<style scoped></style>
