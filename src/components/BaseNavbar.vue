<script setup lang="ts">
import { computed } from 'vue'
import { type RouteRecordNameGeneric, useRoute } from 'vue-router'

import {
  JOB_DETAILS_ROUTE_NAME,
  JOBS_MAIN_ROUTE_NAME,
  JOBS_ROUTE_NAME,
} from '#/router/jobsRouteRecord.ts'

import LinkButton from './LinkButton.vue'
import PreferencesModal from './PreferencesModal.vue'

const route = useRoute()

const isJobsActive = computed(() => {
  const jobsRouteNames = [
    JOBS_MAIN_ROUTE_NAME,
    JOBS_ROUTE_NAME.JOB_LIST,
    JOBS_ROUTE_NAME.JOB,
    JOB_DETAILS_ROUTE_NAME.JOB_DETAILS,
    JOB_DETAILS_ROUTE_NAME.JOB_EDIT,
  ] as RouteRecordNameGeneric[]

  return route.matched.every((matched) => matched.name && jobsRouteNames.includes(matched.name))
})

const links = computed(() => [
  {
    to: '/',
    label: 'Home',
    activeClass: 'no-underline transition-all duration-40 border-b',
  },
  {
    to: '/jobs',
    label: 'Jobs',
    class: { 'no-underline transition-all duration-40 border-b': isJobsActive.value },
  },
  {
    to: '/jobs/add',
    label: 'Add job',
    activeClass: 'no-underline transition-all duration-40 border-b',
  },
])
</script>

<template>
  <header
    class="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-10 sticky top-0 h-(--navbar-height) z-1 shadow-md border-b bg-(--navbar-bg) text-(--navbar-text) shadow-(color:--navbar-shadow)"
  >
    <nav class="flex items-center gap-1">
      <LinkButton
        v-for="linkItem in links"
        :key="linkItem.to"
        class="px-2 py-1 rounded-xs hover:bg-[var(--navbar-bg-hover)] focus-visible:bg-[var(--navbar-bg-hover)] hover:text-[var(--navbar-text-hover)] focus-visible:text-[var(--navbar-text-hover)]"
        appearance="text"
        :to="linkItem.to"
        :activeClass="linkItem.activeClass"
        :class="linkItem.class"
      >
        {{ linkItem.label }}
      </LinkButton>
    </nav>
    <h2 class="flex items-center justify-center gap-3">
      <img
        alt="Vue logo"
        class="drop-shadow-[0_0_5px]"
        src="../assets/logo.svg"
        width="40"
        height="40"
      />
      <span>Vue Jobs</span>
    </h2>
    <PreferencesModal />
  </header>
</template>
