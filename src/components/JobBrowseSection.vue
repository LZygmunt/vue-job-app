<script setup lang="ts">
import type { JobsSuspendableProps } from '#/components/JobSuspendable.vue'

import BaseSection from './BaseSection.vue'
import BaseTitle from './BaseTitle.vue'
import JobCardFooter from './JobCardFooter.vue'
import JobCardWrapper from './JobCardWrapper.vue'
import JobSuspendable from './JobSuspendable.vue'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface JobBrowseSectionProps extends JobsSuspendableProps {}

const searchParamsProps = defineProps<JobBrowseSectionProps>()
</script>

<template>
  <BaseSection>
    <BaseTitle>Browse Jobs</BaseTitle>
    <div class="grid grid-cols-3 gap-4">
      <Suspense>
        <template #default>
          <JobSuspendable v-bind="searchParamsProps" />
        </template>
        <template #fallback>
          <JobCardWrapper
            v-for="(_, index) in Array(3)"
            :key="index"
            class="animate-pulse"
          >
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
  </BaseSection>
</template>
