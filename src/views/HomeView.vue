<script setup lang="ts">
import ActionCard from '#/components/ActionCard.vue'
import BaseBanner from '#/components/BaseBanner.vue'
import BaseRedirectButton from '#/components/BaseRedirectButton.vue'
import JobBrowseSection from '#/components/JobBrowseSection.vue'
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
          redirectTo="/jobs"
          variant="secondary"
        >
          Browse Jobs
        </BaseRedirectButton>
      </ActionCard>
      <ActionCard
        class="p-6"
        title="For Employers"
        description="List your job to find the perfect developer for the role "
      >
        <BaseRedirectButton
          class="mt-2"
          redirectTo="/jobs/add"
        >
          Add Job
        </BaseRedirectButton>
      </ActionCard>
    </section>
    <JobBrowseSection :limit="3" />
    <section class="text-center py-8">
      <BaseRedirectButton
        class="view-all-button w-1/3"
        redirectTo="/jobs"
        variant="secondary"
      >
        View All Jobs
      </BaseRedirectButton>
    </section>
  </main>
</template>

<style scoped>
@reference '#/assets/main.css';

.view-all-button {
  @apply py-4;
}
</style>
