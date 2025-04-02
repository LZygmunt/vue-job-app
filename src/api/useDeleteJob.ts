import { useQueryClient } from '@tanstack/vue-query'
import useDelete from './useDelete.ts'

const ENDPOINT = '/jobs/:id' as const

const useDeleteJob = () => {
  const qc = useQueryClient()

  return useDelete(ENDPOINT, {
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['/jobs'] })
    },
  })
}

export default useDeleteJob
