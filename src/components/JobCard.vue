<script setup lang="ts">
import JobCardFooter from './JobCardFooter.vue'
import JobCardWrapper from './JobCardWrapper.vue'
import JobLocation from './JobLocation.vue'
import LinkButton from './LinkButton.vue'
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
    <template #footer>
      <JobCardFooter>
        <template #location>
          <JobLocation>{{ location }}</JobLocation>
        </template>
        <template #readMore>
          <LinkButton :to="`/jobs/${id}`"> Read More </LinkButton>
        </template>
      </JobCardFooter>
    </template>
  </JobCardWrapper>
</template>
