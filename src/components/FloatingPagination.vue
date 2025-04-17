<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

interface FloatingPaginationProps {
  lastPage?: number
}

const { lastPage = 10 } = defineProps<FloatingPaginationProps>()

const floatingPagination = useTemplateRef<HTMLDivElement>('floating-pagination')

const route = useRoute()

const isActive = ref(false)
const timeoutId = ref<number | null>(null)
const TIMEOUT_5_SECONDS = 5000

const delayHidePagination = () =>
  setTimeout(() => {
    if (floatingPagination.value?.matches(':hover')) {
      timeoutId.value = delayHidePagination()

      return
    }
    isActive.value = false
    timeoutId.value = null
  }, TIMEOUT_5_SECONDS)

const handle = () => {
  if (timeoutId.value) return

  isActive.value = true
  timeoutId.value = delayHidePagination()
}

const currentPage = computed(() => (route.query.page ? Number(route.query.page) : 1))
const prevPage = computed(() => {
  const pages = currentPage.value - 1
  return pages < 1 ? 1 : pages
})
const nextPage = computed(() => {
  const page = currentPage.value + 1
  return page > lastPage ? lastPage : page
})

const getRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const pages = computed(() => {
  const allPages = getRange(1, lastPage)

  if (currentPage.value < 5) {
    return allPages.filter((val) => val <= 5 || val >= lastPage).toSpliced(-1, 0, -1)
  }

  if (currentPage.value >= lastPage - 3 && currentPage.value <= lastPage) {
    return allPages.filter((val) => val === 1 || val >= lastPage - 4).toSpliced(1, 0, -1)
  }

  return allPages
    .filter(
      (val) =>
        val === 1
        || val === lastPage
        || (val >= currentPage.value - 1 && val <= currentPage.value + 1),
    )
    .toSpliced(1, 0, -1)
    .toSpliced(-1, 0, -1)
})
</script>

<template>
  <div
    ref="floating-pagination"
    class="floating-pagination__wrapper"
  >
    <ul
      class="floating-pagination list"
      :class="isActive ? 'active' : ''"
      @mouseover="handle"
    >
      <li>
        <RouterLink
          :to="`?page=${prevPage}`"
          :aria-label="`Go to page ${prevPage}`"
          class=""
        >
          <i class="pi pi-chevron-left chevron" />
        </RouterLink>
      </li>
      <li>
        <ul class="list">
          <li
            v-for="page in pages"
            :key="page"
            class="page"
            :aria-current="page === currentPage ? 'page' : undefined"
            :aria-label="page > 0 ? `Go to page ${page}` : undefined"
            :aria-hidden="!isActive && page !== currentPage ? 'true' : undefined"
          >
            <span
              v-if="page === -1"
              class="page__item--dots"
            >
              ...
            </span>
            <RouterLink
              v-else-if="page !== currentPage"
              :to="`?page=${page}`"
              class="page__item"
            >
              {{ page }}
            </RouterLink>
            <span
              v-else
              class="page__item"
              tabindex="0"
            >
              {{ page }}
            </span>
          </li>
        </ul>
      </li>
      <li>
        <RouterLink
          :to="`?page=${nextPage}`"
          :aria-label="`Go to page ${nextPage}`"
        >
          <i class="pi pi-chevron-right chevron" />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference '#/assets/main.css';

.floating-pagination__wrapper {
  @apply fixed
    bottom-0
    w-full
    flex
    items-center
    justify-center;

  .list {
    @apply flex items-center;

    li {
      @apply inline-block;
    }
    li:not(.page[aria-current]) {
      @apply overflow-hidden;
    }
    li a {
      @apply text-inherit;
    }
    .list {
      @apply border-x border-neutral-700 px-1.5;
    }
  }

  .list,
  .page {
    @apply transition-all duration-3000 ease-in-out;
  }

  .floating-pagination {
    @apply px-2
      py-1
      rounded-t-lg
      dark:bg-neutral-900
      dark:shadow-neutral-900
      w-fit
      text-base
      border-x-1
      border-t-1
      border-neutral-700
      scale-75
      translate-y-1
      hover:shadow-[0_0_75px]
      hover:shadow-green-500;
  }

  .floating-pagination.active {
    @apply -translate-y-5 rounded-lg scale-100;

    .list {
      @apply max-w-[20em] gap-1.5 overflow-hidden;
    }

    .page:not([aria-current]) {
      @apply max-w-[100%] opacity-100;
    }
  }

  .floating-pagination:not(.active) {
    .list {
      gap: 0;
    }
    .chevron {
      @apply text-neutral-50/50;
    }

    .page[aria-current] {
      @apply text-green-500/80;
    }

    .page:not([aria-current]) {
      @apply px-0 max-w-0 opacity-0;
    }
  }
}

.chevron {
  @apply text-neutral-50/70 hover:text-neutral-50;
}

.page {
  @apply text-neutral-50/70 hover:text-neutral-50 inline-block;

  &[aria-current] {
    @apply text-green-500 cursor-default;
  }

  .page__item {
    @apply px-1;
  }
  &:has(.page__item--dots) {
    @apply pointer-events-none select-none;
  }
}

@keyframes show {
  from {
    .list {
      gap: 0;
    }
    .chevron {
      color: color-mix(in oklab, var(--color-neutral-50) 50%, transparent);
    }

    .page[aria-current] {
      color: color-mix(in oklab, var(--color-green-500) 80%, transparent);
    }

    .page:not([aria-current]) {
      padding-inline: 0;
      max-width: 0;
      opacity: 0;
    }
  }
  to {
    translate: 0 -1.25rem;
    border-radius: 0.5rem;
    scale: 1;

    .list {
      max-width: 20em;
      gap: 0.375rem;
    }

    .page:not([aria-current]) {
      max-width: 100%;
      opacity: 1;
    }
  }
}
</style>
