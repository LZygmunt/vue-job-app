import { MINUTE } from '#/constans.ts'
import type { JobOfferDTO } from './jobDTO.ts'
import useGet from './useGet.ts'

export interface UseGetJobByIdOptions<TJob> {
  select?: (data: JobOfferDTO) => TJob
  id: string
}

const ENDPOINT = '/jobs/:id' as const

const useGetJobById = <TJob = JobOfferDTO>({ id, select }: UseGetJobByIdOptions<TJob>) =>
  useGet<JobOfferDTO, TJob, [], typeof ENDPOINT>(ENDPOINT, {
    params: { id },
    staleTime: 5 * MINUTE,
    select,
  })

export default useGetJobById
