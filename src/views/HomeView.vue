<script setup lang="ts">
import ActionCard from '#/components/ActionCard.vue'
import BaseBanner from '#/components/BaseBanner.vue'
import JobBrowseSection from '#/components/JobBrowseSection.vue'
import LinkButton from '#/components/LinkButton.vue'
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
        <LinkButton
          class="mt-2"
          to="/jobs"
          variant="secondary"
        >
          Browse Jobs
        </LinkButton>
      </ActionCard>
      <ActionCard
        title="For Employers"
        description="List your job to find the perfect developer for the role "
      >
        <LinkButton
          class="mt-2"
          to="/jobs/add"
        >
          Add Job
        </LinkButton>
      </ActionCard>
    </section>
    <JobBrowseSection
      :limit="3"
      :disablePagination="true"
    />
    <section class="text-center py-8">
      <LinkButton
        class="py-4 w-1/3"
        to="/jobs"
        variant="secondary"
      >
        View All Jobs
    </section>
      </LinkButton>
  </main>
</template>
