<script setup lang="ts">
import JobCard, { type JobOffers } from './JobCard.vue'
interface JobBrowseSectionProps {
  jobs: JobOffers
}
const { jobs } = defineProps<JobBrowseSectionProps>()
</script>

<template>
  <section class="py-8 px-4 bg-gray-100 dark:bg-gray-500/20 flex flex-col gap-8">
    <h2 class="text-center text-green-500 !text-4xl !font-black">Browse Jobs</h2>
    <div class="grid grid-cols-3 gap-4">
      <JobCard
        v-for="job in jobs"
        :key="job.id"
        v-bind="job"
      />
    </div>
  </section>
</template>

<style scoped></style>
