<script setup lang="ts">
import useAddJob from '#/api/useAddJob.ts'
import BaseCard from '#/components/BaseCard.vue'
import BaseSection from '#/components/BaseSection.vue'
import BaseTitle from '#/components/BaseTitle.vue'
import JobManageForm from '#/components/JobManageForm.vue'
import type { Job } from '#/components/JobTypes.ts'
import { useRouter } from 'vue-router'

const { mutate } = useAddJob()
const router = useRouter()

const saveJob = (job: Job) => {
  mutate(
    {
      title: job.name,
      type: job.type,
      location: job.location,
      description: job.description,
      salary: job.salary,
      company: {
        name: job.companyName,
        description: job.companyDescription,
        contactEmail: job.contactEmail,
        contactPhone: job.contactPhone,
      },
    },
    {
      onSuccess: (res) => {
        console.log('success ->', res)
        router.push(`/jobs/${res.id}`)
      },
      onError: (res) => {
        console.log('error ->', res)
      },
    },
  )
}
</script>

<template>
  <BaseSection>
    <BaseCard class="w-full max-w-4xl mx-auto p-6">
      <BaseTitle>Add Job</BaseTitle>
      <JobManageForm @save:job="saveJob" />
    </BaseCard>
  </BaseSection>
</template>

<style scoped></style>
