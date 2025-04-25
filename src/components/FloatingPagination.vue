<script setup lang="ts">
import { ref, toRefs, useTemplateRef } from 'vue'
import { useCurrentPage } from '#/composables/useCurrentPage.ts'
import { usePagination } from '#/composables/usePagination.ts'

interface FloatingPaginationProps {
  lastPage?: number
}

const props = withDefaults(defineProps<FloatingPaginationProps>(), {
  lastPage: 10,
})
const { lastPage } = toRefs(props)

const floatingPagination = useTemplateRef<HTMLDivElement>('floating-pagination')

const isMaximized = ref(false)
const timeoutId = ref<number | null>(null)
const TIMEOUT_5_SECONDS = 5000

const delayMinimizePagination = () =>
  setTimeout(() => {
    if (floatingPagination.value?.matches(':hover')) {
      timeoutId.value = delayMinimizePagination()

      return
    }
    isMaximized.value = false
    timeoutId.value = null
  }, TIMEOUT_5_SECONDS)

const handle = () => {
  if (timeoutId.value) return

  isMaximized.value = true
  timeoutId.value = delayMinimizePagination()
}

// ToDo: make possible to interact with minimized pagination
const { currentPage } = useCurrentPage()
const { prevPage, prevPageDisabled, nextPage, nextPageDisabled, pages } = usePagination({
  lastPage,
  currentPage,
})
</script>

<template>
  <div
    ref="floating-pagination"
    class="floating-pagination__wrapper"
  >
    <ul
      class="floating-pagination list"
      :class="isMaximized ? 'maximized' : ''"
      @mouseover="handle"
    >
      <li>
        <RouterLink
          :to="`?page=${prevPage}`"
          :aria-label="`Go to page ${prevPage}`"
          :disabled="prevPageDisabled ? '' : undefined"
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
            :aria-hidden="!isMaximized && page !== currentPage ? 'true' : undefined"
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
          :disabled="nextPageDisabled ? '' : undefined"
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
    @apply flex items-center gap-1.5;

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
    @apply transition-all duration-300 ease-in-out;
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
  /* ToDo: after switching to maximized ul immediately get width equals to all elements even nested
      li elements have at first glance 0 width set by max-width. */
  .floating-pagination.maximized {
    @apply -translate-y-5 rounded-lg scale-100;

    .list {
      @apply max-w-[20em] overflow-hidden;
    }

    .page:not([aria-current]) {
      @apply max-w-[100%] opacity-100;
    }
  }

  .floating-pagination:not(.maximized) {
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
