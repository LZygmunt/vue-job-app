<script setup lang="ts">
import type { SearchParams } from '#/api/utils/types.ts'
import JobCardFooter from '#/components/JobCardFooter.vue'
import JobCardWrapper from './JobCardWrapper.vue'
import JobSuspendable from './JobSuspendable.vue'

const searchParamsProps = defineProps<SearchParams>()
</script>

<template>
  <section class="py-8 px-4 bg-gray-100 dark:bg-gray-500/20 flex flex-col gap-8">
    <h2 class="text-center text-green-500 !text-4xl !font-black">Browse Jobs</h2>
    <div class="grid grid-cols-3 gap-4">
      <Suspense>
        <template #default>
          <JobSuspendable v-bind="searchParamsProps" />
        </template>
        <template #fallback>
          <JobCardWrapper v-for="(_, index) in Array(3)" :key="index" class="animate-pulse">
            <template #mainDetails>
              <div class="h-2 w-1/5 rounded bg-stone-400" />
              <div class="h-4 w-3/5 rounded bg-stone-400" />
              <div class="h-2 rounded bg-stone-400" />
              <div class="h-2 rounded bg-stone-400" />
              <div class="h-2 rounded bg-stone-400" />
            </template>
            <template #salary>
              <div class="h-2 w-40 rounded bg-stone-400 mt-8" />
            </template>
            <template #footer>
              <JobCardFooter>
                <template #location>
                  <div class="h-2 w-28 rounded bg-stone-400" />
                </template>
                <template #readMore>
                  <div class="h-4 w-28 rounded bg-stone-400" />
                </template>
              </JobCardFooter>
            </template>
          </JobCardWrapper>
        </template>
      </Suspense>
    </div>
  </section>
</template>

<style scoped></style>
