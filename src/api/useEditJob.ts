import { useQueryClient } from '@tanstack/vue-query'
import type { JobOfferDTO } from './jobDTO.ts'
import usePatch from './usePatch.ts'

const ENDPOINT = '/jobs/:id' as const

const useEditJob = () => {
  const qc = useQueryClient()

  return usePatch<
    JobOfferDTO,
    typeof ENDPOINT,
    JobOfferDTO,
    { previousJob?: JobOfferDTO; newJob: JobOfferDTO }
  >(ENDPOINT, {
    onMutate: async (newJob: JobOfferDTO) => {
      await qc.cancelQueries({ queryKey: ['/jobs/:id', newJob.id] })

      const previousJob = qc.setQueryData<JobOfferDTO>(['/jobs/:id', newJob.id], newJob)

      return { previousJob, newJob }
    },
    onError: (err, newTodo, context) => {
      if (context) {
        qc.setQueryData(['/jobs/:id', context.newJob.id], context.previousJob)
      }
    },
    onSettled(newJob) {
      if (newJob) {
        qc.invalidateQueries({ queryKey: ['/jobs/:id', newJob.id] })
      }
    },
  })
}

export default useEditJob
