import { MINUTE } from '#/constans.ts'
import type { JobOfferDTO } from './jobDTO.ts'
import type { PaginatedList } from './types.ts'
import type { SearchParams } from './utils/utilTypes.ts'
import useGet from './useGet.ts'

export type JobOffersDTO =
  | JobOfferDTO[]
  | PaginatedList<JobOfferDTO>

export interface UseGetJobsOptions<TJobs> {
  searchParams?: SearchParams,
  select?: (data: JobOffersDTO) => TJobs,
}

const ENDPOINT = '/jobs' as const

const useGetJobs = <TJobs>({
  searchParams,
  select,
}: UseGetJobsOptions<TJobs>) => useGet<JobOffersDTO, TJobs, [], typeof ENDPOINT>(
  ENDPOINT,
  {
    searchParams,
    staleTime: 5 * MINUTE,
    select,
  }
)

export default useGetJobs
