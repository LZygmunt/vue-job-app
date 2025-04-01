import type { JobOfferDTO } from './jobDTO.ts'
import usePost from './usePost.ts'

const ENDPOINT = '/jobs' as const

const useAddJob = () => usePost<Omit<JobOfferDTO, 'id'>, typeof ENDPOINT, JobOfferDTO>(ENDPOINT)

export default useAddJob
