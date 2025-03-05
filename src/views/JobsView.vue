<script setup lang="ts">
import JobBrowseSection from '#/components/JobBrowseSection.vue'
import { ref } from 'vue'
import jsonJobs from '../../jobs.json'

const jobs = ref(jsonJobs.jobs)
</script>

<template>
  <JobBrowseSection :jobs="jobs" />
</template>

<style scoped></style>
