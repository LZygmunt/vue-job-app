import type { MaybeRefOrGetter } from 'vue'
import { MINUTE } from '#/constans.ts'
import type { DeepMaybeRefOrGetter } from '#/utilityTypes.ts'
import type { JobOfferDTO } from './jobDTO.ts'
import type { PaginatedList } from './types.ts'
import useGet from './useGet.ts'
import type { SearchParams } from './utils/utilTypes.ts'

export type JobOffersDTO = PaginatedList<JobOfferDTO>

export interface UseGetJobsOptions<TJobs> {
  searchParams?: MaybeRefOrGetter<DeepMaybeRefOrGetter<SearchParams>>
  select?: (data: JobOffersDTO) => TJobs
}

const ENDPOINT = '/jobs' as const

const useGetJobs = <TJobs = JobOffersDTO>({ searchParams, select }: UseGetJobsOptions<TJobs>) =>
  useGet<JobOffersDTO, TJobs, [], typeof ENDPOINT>(ENDPOINT, {
    // ToDo: make type more clear
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    searchParams,
    staleTime: 5 * MINUTE,
    select,
  })

export default useGetJobs
