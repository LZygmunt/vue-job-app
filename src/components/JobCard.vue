<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import BaseRedirectButton from './BaseRedirectButton.vue'
import TruncateText from './TruncateText.vue'

interface Company {
  name: string
  description: string
  contactEmail: string
  contactPhone: string
}
export interface JobOffer {
  id: string
  title: string
  type: string
  location: string
  description: string
  salary: string
  company: Company
}
export type JobOffers = JobOffer[]
type JobCardProps = JobOffer
const { title, type, location, description, salary, id } = defineProps<JobCardProps>()
</script>

<template>
  <BaseCard class="bg-white dark:bg-neutral-700 p-4 flex flex-col justify-between gap-4">
    <div class="flex flex-col gap-4">
      <span>{{ type }}</span>
      <span class="font-bold text-xl">{{ title }}</span>
      <TruncateText>{{ description }}</TruncateText>
    </div>
    <div class="flex flex-col">
      <span class="text-green-500">{{ salary }}</span>
      <hr class="my-4 border-gray-500" />
      <div class="flex justify-between items-center">
        <span>
          <i class="pi pi-map-marker" />
          {{ location }}
        </span>
        <BaseRedirectButton
          label="Read More"
          :redirectTo="`/jobs/${id}`"
        />
      </div>
    </div>
  </BaseCard>
</template>

<style scoped></style>
