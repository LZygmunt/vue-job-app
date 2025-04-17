<script setup lang="ts">
import JobBrowseSection from '#/components/JobBrowseSection.vue'
import FloatingPagination from '#/components/FloatingPagination.vue'
</script>

<template>
  <JobBrowseSection
    :page="1"
    :perPage="12"
  />
  <FloatingPagination />
</template>

<style scoped></style>
