<script setup lang="ts">
import JobCardWrapper from './JobCardWrapper.vue'
import BaseLinkButton from './BaseLinkButton.vue'
import TruncateText from './TruncateText.vue'

export interface JobOffer {
  id: string
  title: string
  type: string
  location: string
  description: string
  salary: string
}
export type JobOffers = JobOffer[]
type JobCardProps = JobOffer
const { title, type, location, description, salary, id } = defineProps<JobCardProps>()
// ToDo #1: introduce old-fashion pagination
// ToDo #2: introduce infinity scroll pagination
// ToDo #3: introduce possibility to switch between them
</script>

<template>
  <JobCardWrapper>
    <template #mainDetails>
      <span>{{ type }}</span>
      <span class="font-bold text-xl">{{ title }}</span>
      <TruncateText>{{ description }}</TruncateText>
    </template>
    <template #salary>
      <span class="text-green-500">{{ salary }}</span>
    </template>
    <template #location>
      <span>
        <i class="pi pi-map-marker" />
        {{ location }}
      </span>
    </template>
    <template #readMore>
      <BaseLinkButton :to="`/jobs/${id}`">
        Read More
      </BaseLinkButton>
    </template>
  </JobCardWrapper>
</template>

<style scoped></style>
