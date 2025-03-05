<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/jobs">Jobs</RouterLink>
      <RouterLink to="/jobs/add">Add job</RouterLink>
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
    border-b
    text-neutral-50
    bg-green-700
    border-b-green-500
    dark:text-green-500
    dark:bg-transparent;
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

.router-link-exact-active,
.router-link-active {
  @apply no-underline
  transition-all
  duration-40
  dark:text-green-500
  border-b
  dark:border-b-green-500;
}
</style>
