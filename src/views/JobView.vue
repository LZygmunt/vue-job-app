<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import useDeleteJob from '#/api/useDeleteJob.ts'
import useGetJobById from '#/api/useGetJobById.ts'
import Button from '#/components/Button.vue'
import JobButtonBack from '#/components/JobButtonBack.vue'
import JobCardWrapper from '#/components/JobCardWrapper.vue'
import JobLocation from '#/components/JobLocation.vue'

const { params } = useRoute()
const router = useRouter()
const toast = useToast()

const { data, isLoading, error } = useGetJobById({ id: params.id as string })
const { mutate: deleteJob } = useDeleteJob()

const deleteJobHandler = async () => {
  deleteJob(
    {
      id: params.id as string,
    },
    {
      onSuccess: () => {
        toast.success('Job deleted successfully.')
        router.push('/jobs')
      },
      onError: () => {
        toast.error('Something went wrong.')
      },
    },
  )
}

const editJobHandler = async () => {
  router.push({
    path: `/jobs/${params.id}/edit`,
    state: { backTo: router.options.history.state.back },
  })
}

watchEffect(() => {
  if (error.value && 'cause' in error.value && error.value.cause === 404) {
    router.push('/jobs')
  }
})
</script>

<template>
  <section class="px-10 sticky top-(--navbar-height) h-0">
    <JobButtonBack />
  </section>
  <section class="details">
    <JobCardWrapper class="details__main">
      <template #mainDetails>
        <div
          v-if="isLoading"
          class="h-2 w-1/5 rounded bg-stone-400"
        />
        <span v-else>{{ data?.type }}</span>
        <div
          v-if="isLoading"
          class="h-4 w-3/5 rounded bg-stone-400"
        />
        <span
          v-else
          class="font-bold text-4xl"
          >{{ data?.title }}</span
        >
        <div
          v-if="isLoading"
          class="h-2 w-28 rounded bg-stone-400"
        />
        <JobLocation v-else>{{ data?.location }}</JobLocation>
      </template>
    </JobCardWrapper>
    <JobCardWrapper class="details__company">
      <template #mainDetails>
        <span class="font-bold text-xl">Company Info</span>
        <div
          v-if="isLoading"
          class="h-2 w-28 rounded bg-stone-400"
        />
        <span
          v-else
          class="font-bold text-2xl"
          >{{ data?.company?.name }}</span
        >
        <div
          v-if="isLoading"
          class="h-2 w-28 rounded bg-stone-400"
        />
        <span
          v-else
          class="text-lg"
          >{{ data?.company?.description }}</span
        >
      </template>
      <template #footer>
        <p class="flex flex-col gap-2">
          <span class="font-bold text-2xl">Contact Email:</span>
          <span
            v-if="isLoading"
            class="h-2 w-28 rounded bg-stone-400"
          />
          <span
            v-else
            class="font-bold text-lg rounded-xs px-2 py-1 bg-primary/20"
            >{{ data?.company?.contactEmail }}</span
          >
          <span class="font-bold text-2xl">Contact Phone:</span>
          <span
            v-if="isLoading"
            class="h-2 w-28 rounded bg-stone-400"
          />
          <span
            v-else
            class="font-bold text-lg rounded-xs px-2 py-1 bg-primary/20"
            :class="data?.company?.contactPhone ? '' : 'italic'"
            >{{ data?.company?.contactPhone || 'No data' }}</span
          >
        </p>
      </template>
    </JobCardWrapper>
    <JobCardWrapper class="details__description">
      <template #mainDetails>
        <span class="font-bold text-xl text-primary">Job Description</span>
        <div
          v-if="isLoading"
          class="h-2 w-28 rounded bg-stone-400"
        />
        <span
          v-else
          class="text-lg"
          >{{ data?.description }}</span
        >
        <span class="font-bold text-xl text-primary">Salary</span>
        <div
          v-if="isLoading"
          class="h-2 w-28 rounded bg-stone-400"
        />
        <span
          v-else
          class="text-lg"
          >{{ data?.salary }}</span
        >
      </template>
    </JobCardWrapper>
    <JobCardWrapper class="details__buttons">
      <template #mainDetails>
        <span class="font-bold text-xl">Manage Job</span>
        <Button
          variant="success"
          @click="editJobHandler"
        >
          Edit Job
        </Button>
        <Button
          variant="danger"
          @click="deleteJobHandler"
        >
          Delete Job
        </Button>
      </template>
    </JobCardWrapper>
  </section>
</template>

<style scoped>
@reference '#/assets/main.css';

.details {
  @apply container
    grid
    grid-cols-[minmax(60em,_1fr)_minmax(30em,_1fr)]
    grid-rows-[masonry]
    gap-4
    mx-auto
    py-8;

  grid-template-areas:
    'main company'
    'description company'
    '. company'
    '. buttons';

  .details__main {
    grid-area: main;
  }
  .details__company {
    grid-area: company;
  }
  .details__description {
    grid-area: description;
  }
  .details__buttons {
    grid-area: buttons;
  }
}
</style>
