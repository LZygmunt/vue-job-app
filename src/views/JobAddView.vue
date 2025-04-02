<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import useAddJob from '#/api/useAddJob.ts'
import BaseCard from '#/components/BaseCard.vue'
import BaseSection from '#/components/BaseSection.vue'
import BaseTitle from '#/components/BaseTitle.vue'
import JobManageForm from '#/components/JobManageForm.vue'
import type { Job } from '#/components/JobTypes.ts'

const { mutate } = useAddJob()
const router = useRouter()
const toast = useToast()

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
        toast.success('Job added successfully.')
        router.push(`/jobs/${res.id}`)
      },
      onError: (res) => {
        console.error(res)
        toast.error('Something went wrong.')
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
