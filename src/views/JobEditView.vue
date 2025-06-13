<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import useEditJob from '#/api/useEditJob.ts'
import useGetJobById from '#/api/useGetJobById.ts'
import BaseCard from '#/components/BaseCard.vue'
import BaseSection from '#/components/BaseSection.vue'
import BaseTitle from '#/components/BaseTitle.vue'
import JobManageForm from '#/components/JobManageForm.vue'
import type { Job } from '#/components/JobTypes.ts'

const { params } = useRoute()
const router = useRouter()
const toast = useToast()

const { data, isLoading, error } = useGetJobById({
  id: params.id as string,
  select: (jobDetails) =>
    ({
      id: jobDetails.id,
      name: jobDetails.title,
      type: jobDetails.type,
      location: jobDetails.location,
      description: jobDetails.description,
      salary: jobDetails.salary,
      companyName: jobDetails.company.name,
      companyDescription: jobDetails.company.description,
      contactEmail: jobDetails.company.contactEmail,
      contactPhone: jobDetails.company.contactPhone,
    }) as Job & { id: string },
})
const { mutate } = useEditJob()

const saveJob = (job: Job) => {
  mutate(
    {
      id: params.id as string,
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
        toast.success('Job edited successfully.')
        router.push({
          path: `/jobs/${res.id}`,
          state: { back: router.options.history.state.backTo },
        })
      },
      onError: (res) => {
        console.error(res)
        toast.error('Something went wrong.')
      },
    },
  )
}

watchEffect(() => {
  if (error.value && 'cause' in error.value && error.value.cause === 404) {
    router.push('/jobs')
  }
})
</script>

<template>
  <BaseSection>
    <BaseCard class="w-full max-w-4xl mx-auto p-6">
      <BaseTitle>Edit Job</BaseTitle>
      <div
        v-if="isLoading"
        class="space-y-6"
      >
        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-4 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-4 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-8 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-4 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-4 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-4 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-8 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-4 w-full rounded bg-stone-400"></div>
        </div>

        <div class="space-y-4">
          <div class="h-2 w-28 rounded bg-stone-400"></div>
          <div class="h-4 w-full rounded bg-stone-400"></div>
        </div>
      </div>
      <JobManageForm
        v-else
        :initials="data"
        @save:job="saveJob"
      />
    </BaseCard>
  </BaseSection>
</template>

<style scoped></style>
