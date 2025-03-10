import { MINUTE } from '#/constans.ts'
import type { JobOfferDTO } from './jobDTO.ts'
import useGet from './useGet.ts'

export interface UseGetJobByIdOptions<TJob> {
  select?: (data: JobOfferDTO) => TJob
  jobId: string
}

const ENDPOINT = '/jobs/:jobId' as const

const useGetJobById = <TJob>({
  jobId,
  select,
}: UseGetJobByIdOptions<TJob>) => useGet<JobOfferDTO, TJob, [], typeof ENDPOINT>(
  ENDPOINT,
  {
    params: { jobId },
    staleTime: 5 * MINUTE,
    select,
  }
)

export default useGetJobById
