import { computed, ref, toValue, watchEffect } from 'vue'

import type { DeepMaybeRefOrGetter } from '../utilityTypes.ts'

export interface UsePaginationOptions {
  lastPage: number
  currentPage: number
  maxDisplayedPages?: number
}

const getRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const MAX_DISPLAYED_PAGES = 6

export function usePagination(options: DeepMaybeRefOrGetter<UsePaginationOptions>) {
  const _currentPage = ref(0)
  const _lastPage = ref(0)
  const _maxDisplayedPages = ref(MAX_DISPLAYED_PAGES)

  watchEffect(() => {
    const { lastPage, currentPage, maxDisplayedPages } = toValue(options)
    _currentPage.value = toValue(currentPage)
    _lastPage.value = toValue(lastPage)
    const mdp = toValue(maxDisplayedPages)
    if (mdp) {
      _maxDisplayedPages.value = mdp
    }
  })

  const prevPage = computed(() => {
    const pages = _currentPage.value - 1
    return pages < 1 ? 1 : pages
  })

  const nextPage = computed(() => {
    const page = _currentPage.value + 1
    return page > _lastPage.value ? _lastPage.value : page
  })

  const pages = computed(() => {
    const allPages = getRange(1, _lastPage.value)

    if (_lastPage.value <= _maxDisplayedPages.value) {
      return allPages
    }

    if (_currentPage.value < 5) {
      return allPages.filter((val) => val <= 5 || val >= _lastPage.value).toSpliced(-1, 0, -1)
    }

    if (_currentPage.value >= _lastPage.value - 3 && _currentPage.value <= _lastPage.value) {
      return allPages.filter((val) => val === 1 || val >= _lastPage.value - 4).toSpliced(1, 0, -1)
    }

    return allPages
      .filter(
        (val) =>
          val === 1
          || val === _lastPage.value
          || (val >= _currentPage.value - 1 && val <= _currentPage.value + 1),
      )
      .toSpliced(1, 0, -1)
      .toSpliced(-1, 0, -1)
  })

  return {
    prevPage,
    prevPageDisabled: computed(() => _currentPage.value === 1),
    nextPage,
    nextPageDisabled: computed(() => _currentPage.value === _lastPage.value),
    pages,
  }
}
