<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isJobsActive = computed(() => route.path.startsWith('/jobs') && route.path !== '/jobs/add')
</script>

<template>
  <header>
    <nav>
      <RouterLink
        to="/"
        activeClass="active"
        >Home</RouterLink
      >
      <RouterLink
        to="/jobs"
        :class="{ active: isJobsActive }"
        >Jobs</RouterLink
      >
      <RouterLink
        to="/jobs/add"
        activeClass="active"
        >Add job</RouterLink
      >
    </nav>
    <h2>
      <img
        alt="Vue logo"
        class="logo"
        src="../assets/logo.svg"
        width="40"
        height="40"
      />
      <span>Vue Jobs</span>
    </h2>
  </header>
</template>

<style scoped>
@reference '#/assets/main.css';

header {
  @apply flex
    items-center
    justify-between
    px-10
    py-5.5
    sticky
    top-0
    h-(--navbar-height)
    z-1
    shadow-md
    shadow-green-500/50
    border-b
    text-neutral-50
    bg-green-700
    border-b-green-500
    dark:text-green-500
    dark:bg-neutral-900;
}

h2 {
  @apply flex items-center justify-center gap-3;
}

nav {
  @apply flex
    items-center
    gap-1;

  a {
    @apply px-2
      py-1
      rounded-xs
      hover:bg-green-800
      hover:dark:bg-neutral-800;
  }
}

.active {
  @apply no-underline
  transition-all
  duration-40
  dark:text-green-500
  border-b
  dark:border-b-green-500;
}
</style>
