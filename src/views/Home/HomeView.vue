<script setup lang="ts">
import ActionCard from '#/components/ActionCard.vue'
import BaseBanner from '#/components/BaseBanner.vue'
</script>

<template>
  <main
    id="home-view"
    title="Home"
    role="main"
  >
    <BaseBanner
      title="Become a Vue dev"
      desc="Find the Vue job that fills your skills and needs"
    />
    <div class="w-full max-w-7/8 mx-auto my-6 grid grid-cols-2 gap-4">
      <ActionCard
        class="p-6"
        title="For developers"
        description="Browse our Vue jobs and start your career today"
        redirectLabel="Browse Jobs"
        redirectTo="/jobs"
        variant="secondary"
      />
      <ActionCard
        class="p-6"
        title="For Employers"
        description="List your job to find the perfect developer for the role "
        redirectLabel="Add Job"
        redirectTo="/jobs/add"
      />
    </div>
  </main>
</template>
