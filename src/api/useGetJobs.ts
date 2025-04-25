import { keepPreviousData as VQKeepPreviousData } from '@tanstack/vue-query'
import { MINUTE } from '#/constans.ts'
import type { DeepMaybeRefOrGetter } from '#/utilityTypes.ts'
import type { JobOfferDTO } from './jobDTO.ts'
import type { PaginatedList } from './types.ts'
import useGet from './useGet.ts'
import type { SearchParams } from './utils/utilTypes.ts'

export type JobOffersDTO = PaginatedList<JobOfferDTO>

export interface UseGetJobsOptions<TJobs> {
  searchParams?: DeepMaybeRefOrGetter<SearchParams>
  select?: (data: JobOffersDTO) => TJobs
  keepPreviousData?: boolean
}

const ENDPOINT = '/jobs' as const

const useGetJobs = <TJobs = JobOffersDTO>({
  searchParams,
  select,
  keepPreviousData = true,
}: UseGetJobsOptions<TJobs>) =>
  useGet<JobOffersDTO, TJobs, [], typeof ENDPOINT>(ENDPOINT, {
    searchParams,
    staleTime: 5 * MINUTE,
    select,
    placeholderData: keepPreviousData ? VQKeepPreviousData : undefined,
  })

export default useGetJobs
