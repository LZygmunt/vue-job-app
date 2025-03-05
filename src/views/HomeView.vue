<script setup lang="ts">
import ActionCard from '#/components/ActionCard.vue'
import BaseBanner from '#/components/BaseBanner.vue'
import BaseRedirectButton from '#/components/BaseRedirectButton.vue'
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
          label="Add Job"
          redirectTo="/jobs/add"
        />
      </ActionCard>
    </section>
    <section>
      <h2>Browse Jobs</h2>
    </section>
  </main>
</template>
