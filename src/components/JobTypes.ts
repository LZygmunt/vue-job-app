import type { ExtractValues } from '#/utilityTypes.ts'

export const JOB_TYPE = {
  FullTime: 'Full-Time',
  PartTime: 'Part-Time',
  Remote: 'Remote',
  Internship: 'Internship',
} as const
type JobType = ExtractValues<typeof JOB_TYPE>

export const JOB_SALARY = {
  Default: '',
  Under50: 'Under $50K',
  Between50And60: '$50K - $60K',
  Between60And70: '$60K - $70K',
  Between70And80: '$70K - $80K',
  Between80And90: '$80K - $90K',
  Between90And100: '$90K - $100K',
  Between100And125: '$100K - $125K',
  Between125And150: '$125K - $150K',
  Between150And175: '$150K - $175K',
  Between175And200: '$175K - $200K',
  Over200: 'Over $200K',
} as const
type JobSalary = ExtractValues<typeof JOB_SALARY>

export interface Job {
  type: JobType
  name: string
  description: string
  salary: JobSalary
  location: string
  companyName: string
  companyDescription: string
  contactEmail: string
  contactPhone: string
}

export interface Emit {
  (eventName: 'save:job', job: NonNullable<Job>, e: SubmitEvent): void
}
