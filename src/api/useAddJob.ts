import { useQueryClient } from '@tanstack/vue-query'
import type { JobOfferDTO } from './jobDTO.ts'
import usePost from './usePost.ts'

const ENDPOINT = '/jobs' as const

const useAddJob = () => {
  const qc = useQueryClient()

  return usePost<Omit<JobOfferDTO, 'id'>, typeof ENDPOINT, JobOfferDTO>(ENDPOINT, {
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['/jobs'] })
    },
  })
}

export default useAddJob
