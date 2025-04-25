<script setup lang="ts">
import ActionCard from '#/components/ActionCard.vue'
import BaseBanner from '#/components/BaseBanner.vue'
import BaseLinkButton from '#/components/BaseLinkButton.vue'
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
        title="For developers"
        description="Browse our Vue jobs and start your career today"
        variant="secondary"
      >
        <BaseLinkButton
          class="mt-2"
          to="/jobs"
          variant="secondary"
        >
          Browse Jobs
        </BaseLinkButton>
      </ActionCard>
      <ActionCard
        title="For Employers"
        description="List your job to find the perfect developer for the role "
      >
        <BaseLinkButton
          class="mt-2"
          to="/jobs/add"
        >
          Add Job
        </BaseLinkButton>
      </ActionCard>
    </section>
    <JobBrowseSection
      :limit="3"
      :disablePagination="true"
    />
    <section class="text-center py-8">
      <BaseLinkButton
        class="view-all-button w-1/3"
        to="/jobs"
        variant="secondary"
      >
        View All Jobs
      </BaseLinkButton>
    </section>
  </main>
</template>

<style scoped>
@reference '#/assets/main.css';

.view-all-button {
  @apply py-4;
}
</style>
