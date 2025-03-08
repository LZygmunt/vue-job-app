import type { SearchParams } from '#/api/utils/types.ts'
import useGet from './useGet.ts'

interface CompanyDTO {
  name: string
  description: string
  contactEmail: string
  contactPhone: string
}
interface JobOfferDTO {
  id: string
  title: string
  type: string
  location: string
  description: string
  salary: string
  company: CompanyDTO
}

interface PaginatedList<DTO> {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: DTO[]
}

export type JobOffersDTO =
  | JobOfferDTO[]
  | PaginatedList<JobOfferDTO>

export interface UseGetJobsOptions<TJobs> {
  searchParams?: SearchParams,
  select?: (data: JobOffersDTO) => TJobs,
}

const MINUTE = 60 * 1000
const useGetJobs = <TJobs>({
  searchParams,
  select,
}: UseGetJobsOptions<TJobs>) => useGet<JobOffersDTO, TJobs>(
  '/jobs',
  {
    searchParams,
    staleTime: 5 * MINUTE,
    select,
  }
)

export default useGetJobs
