<script setup lang="ts">
import useGetJobById from '#/api/useGetJobById.ts'
import BaseButton from '#/components/BaseButton.vue'
import JobButtonBack from '#/components/JobButtonBack.vue'
import JobCardWrapper from '#/components/JobCardWrapper.vue'
import JobLocation from '#/components/JobLocation.vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()

const { data, isLoading } = useGetJobById({ jobId: params.id as string })
</script>

<template>
  <section class="back-button-container">
    <JobButtonBack />
  </section>
  <section class="details">
    <JobCardWrapper class="details__main">
      <template #mainDetails>
        <div v-if="isLoading" class="h-2 w-1/5 rounded bg-stone-400" />
        <span v-else>{{ data?.type }}</span>
        <div v-if="isLoading" class="h-4 w-3/5 rounded bg-stone-400" />
        <span v-else class="font-bold text-4xl">{{ data?.title }}</span>
        <div v-if="isLoading" class="h-2 w-28 rounded bg-stone-400" />
        <JobLocation v-else>{{ data?.location }}</JobLocation>
      </template>
    </JobCardWrapper>
    <JobCardWrapper class="details__company">
      <template #mainDetails>
        <span class="font-bold text-xl">Company Info</span>
        <div v-if="isLoading" class="h-2 w-28 rounded bg-stone-400" />
        <span v-else class="font-bold text-2xl">{{ data?.company?.name }}</span>
        <div v-if="isLoading" class="h-2 w-28 rounded bg-stone-400" />
        <span v-else class="text-lg">{{ data?.company?.description }}</span>
      </template>
      <template #footer>
        <p class="flex flex-col gap-2">
          <span class="font-bold text-2xl">Contact Email:</span>
          <span v-if="isLoading" class="h-2 w-28 rounded bg-stone-400" />
          <span v-else class="font-bold text-lg rounded-xs bg-green-300/20 px-2 py-1">{{ data?.company?.contactEmail }}</span>
          <span class="font-bold text-2xl">Contact Phone:</span>
          <span v-if="isLoading" class="h-2 w-28 rounded bg-stone-400" />
          <span v-else class="font-bold text-lg rounded-xs bg-green-300/20 px-2 py-1">{{ data?.company?.contactPhone }}</span>
        </p>
      </template>
    </JobCardWrapper>
    <JobCardWrapper class="details__description">
      <template #mainDetails>
        <span class="font-bold text-xl text-green-500">Job Description</span>
        <div v-if="isLoading" class="h-2 w-28 rounded bg-stone-400" />
        <span v-else class="text-lg">{{ data?.description }}</span>
        <span class="font-bold text-xl text-green-500">Salary</span>
        <div v-if="isLoading" class="h-2 w-28 rounded bg-stone-400" />
        <span v-else class="text-lg">{{ data?.salary }}</span>
      </template>
    </JobCardWrapper>
    <JobCardWrapper class="details__buttons">
      <template #mainDetails>
        <span class="font-bold text-xl">Manage Job</span>
        <BaseButton>Edit Job</BaseButton>
        <BaseButton class="delete-button">Delete Job</BaseButton>
      </template>
    </JobCardWrapper>
  </section>
</template>

<style scoped>
@reference '#/assets/main.css';

.back-button-container {
  @apply px-10 sticky top-(--navbar-height) h-0;
}

.details {
  @apply container
    grid
    grid-cols-[auto_minmax(30em,_1fr)]
    grid-rows-[masonry]
    gap-4
    mx-auto
    py-8;

  grid-template-areas:
    "main company"
    "description company"
    ". company"
    ". buttons";

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

.delete-button {
  @apply bg-red-600 text-neutral-50;
}
</style>
