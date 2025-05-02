<script setup lang="ts">
import { ref, toRefs, useTemplateRef } from 'vue'

import { useCurrentPage } from '#/composables/useCurrentPage.ts'
import { usePagination } from '#/composables/usePagination.ts'
import { useTimeout } from '#/composables/useTimeout.ts'
import { SECOND } from '#/constans.ts'

interface FloatingPaginationProps {
  lastPage?: number
}

const props = withDefaults(defineProps<FloatingPaginationProps>(), {
  lastPage: 10,
})
const { lastPage } = toRefs(props)

const floatingPagination = useTemplateRef<HTMLUListElement>('floating-pagination')

const isMaximized = ref(false)
const clickTimestamp = ref<number | null>(null)
const MINIMIZE_TIMEOUT = 5 * SECOND
const RESET_CLICK_TIMESTAMP_TIMEOUT = 0.5 * SECOND
const MAXIMIZE_TIMEOUT = 0.7 * SECOND

const maximizeTimeoutRegister = useTimeout({
  condition: () => !!floatingPagination.value?.matches(':hover'),
  effect: () => {
    isMaximized.value = false
  },
  delay: MINIMIZE_TIMEOUT,
})

const clickTimeoutRegister = useTimeout({
  condition: () => !!clickTimestamp.value && Date.now() - clickTimestamp.value < MAXIMIZE_TIMEOUT,
  effect: () => {
    clickTimestamp.value = null
  },
  delay: RESET_CLICK_TIMESTAMP_TIMEOUT,
})

const onEnterPagination = () => {
  maximizeTimeoutRegister.startTimeout({
    condition: (timeoutId) => !!(timeoutId || clickTimestamp.value),
    effect: () => {
      isMaximized.value = true
    },
    delay: MAXIMIZE_TIMEOUT,
  })
}

const onClickPagination = () => {
  clickTimeoutRegister.startTimeout({
    condition: () => isMaximized.value,
    effect: () => {
      clickTimestamp.value = Date.now()
      maximizeTimeoutRegister.resetTimeout()
    },
    delay: 0,
  })
}

const { currentPage } = useCurrentPage()
const { prevPage, prevPageDisabled, nextPage, nextPageDisabled, pages } = usePagination({
  lastPage,
  currentPage,
})
</script>

<template>
  <div class="floating-pagination">
    <ul
      ref="floating-pagination"
      class="floating-pagination__list"
      :class="[
        isMaximized ? 'floating-pagination__list--maximized' : '',
        clickTimestamp !== null ? 'floating-pagination__list--focused' : '',
      ]"
      @click="onClickPagination"
      @mouseenter="onEnterPagination"
    >
      <li>
        <RouterLink
          class="floating-pagination__item"
          :to="`?page=${prevPage}`"
          :aria-label="`Go to page ${prevPage}`"
          :aria-current="undefined"
          :disabled="prevPageDisabled ? '' : undefined"
        >
          <i class="pi pi-chevron-left" />
        </RouterLink>
      </li>
      <li
        v-for="page in pages"
        :key="page"
      >
        <span
          v-if="page === -1"
          class="floating-pagination__item floating-pagination__item--dots"
        >
          ...
        </span>
        <RouterLink
          v-else
          class="floating-pagination__item"
          :to="`?page=${page}`"
          :tabindex="page === currentPage ? 0 : undefined"
          :aria-current="page === currentPage ? 'page' : undefined"
          :aria-label="page > 0 ? `Go to page ${page}` : undefined"
          :aria-hidden="!isMaximized && page !== currentPage ? 'true' : undefined"
        >
          {{ page }}
        </RouterLink>
      </li>
      <li>
        <RouterLink
          class="floating-pagination__item"
          :to="`?page=${nextPage}`"
          :aria-label="`Go to page ${nextPage}`"
          :aria-current="undefined"
          :disabled="nextPageDisabled ? '' : undefined"
        >
          <i class="pi pi-chevron-right" />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference '#/assets/main.css';

.floating-pagination {
  @apply fixed
    bottom-0
    w-full
    flex
    items-center
    justify-center;

  .floating-pagination__list {
    @apply rounded-t-lg
      dark:bg-neutral-900
      dark:shadow-neutral-900
      w-fit
      text-base
      border-x-1
      border-t-1
      border-neutral-700
      scale-75
      translate-y-1
      outline-green-700
      hover:shadow-[0_0_75px]
      hover:shadow-green-500;

    li {
      @apply inline-block
      first-of-type:border-r-1
      last-of-type:border-l-1
      border-neutral-700;
    }
  }

  .floating-pagination__list,
  .floating-pagination__item {
    @apply transition-all duration-300 ease-in-out;
  }
  .floating-pagination__item {
    @apply px-0
      py-0.5
      text-neutral-50/70
      hover:text-neutral-50
      block
      rounded-xs
      focus-visible:outline-2
      focus-visible:outline-green-700
      focus-visible:border-green-700/60
      focus-visible:border-1;
    &[aria-current] {
      @apply px-1.5 text-green-500 cursor-default;
    }
    li:is(:first-of-type, :last-of-type) & {
      @apply px-1;
    }
    li:not(:first-of-type, :last-of-type) &:not([aria-current]) {
      @apply max-w-0 opacity-0 invisible;
    }
  }

  .floating-pagination__item--dots {
    @apply hover:text-neutral-50/70;
  }

  .floating-pagination__list.floating-pagination__list--maximized {
    @apply -translate-y-5 rounded-lg scale-125;

    .floating-pagination__item {
      @apply px-1.5;
    }
    li:not(:first-of-type, :last-of-type) .floating-pagination__item:not([aria-current]) {
      @apply max-w-[4ch] opacity-100 visible;
    }
    li:nth-of-type(2) .floating-pagination__item {
      @apply pl-2;
    }
    li:nth-last-of-type(2) .floating-pagination__item {
      @apply pr-2;
    }
  }

  .floating-pagination__list--focused {
    @apply outline-2 outline-green-700 border-green-700/60;
  }
}
</style>
