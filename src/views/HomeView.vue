<script setup lang="ts">
import ActionCard from '#/components/ActionCard.vue'
import BaseBanner from '#/components/BaseBanner.vue'
import BaseRedirectButton from '#/components/BaseRedirectButton.vue'
import JobJobBrowseSection from '#/components/JobBrowseSection.vue'
import { ref } from 'vue'
import jsonJobs from '../../jobs.json'

const jobs = ref(jsonJobs.jobs.slice(0, 3))
</script>

<template>
  <main
    id="home-view"
    title="Home"
  >
    <BaseBanner
      title="Become a Vue dev"
      desc="Find the Vue job that fills your skills and needs"
    />
    <section class="w-full max-w-7/8 mx-auto my-6 grid grid-cols-2 gap-4">
      <ActionCard
        class="p-6"
        title="For developers"
        description="Browse our Vue jobs and start your career today"
        variant="secondary"
      >
        <BaseRedirectButton
          class="mt-2"
          label="Browse Jobs"
          redirectTo="/jobs"
          variant="secondary"
        />
      </ActionCard>
      <ActionCard
        class="p-6"
        title="For Employers"
        description="List your job to find the perfect developer for the role "
      >
        <BaseRedirectButton
          class="mt-2"
          label="Add Job"
          redirectTo="/jobs/add"
        />
      </ActionCard>
    </section>
    <JobJobBrowseSection :jobs="jobs" />
    <section class="text-center py-8">
      <BaseRedirectButton
        class="view-all-button w-1/3"
        label="View All Jobs"
        redirectTo="/jobs"
        variant="secondary"
      />
    </section>
  </main>
</template>

<style scoped>
@reference '#/assets/main.css';

.view-all-button {
  @apply py-4;
}
</style>
