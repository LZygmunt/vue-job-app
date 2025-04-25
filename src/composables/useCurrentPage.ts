import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useCurrentPage() {
  const route = useRoute()

  const currentPage = computed(() => (route.query.page ? Number(route.query.page) : 1))

  return {
    currentPage,
  }
}
