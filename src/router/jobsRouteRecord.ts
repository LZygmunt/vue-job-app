import type { RouteRecordRaw } from 'vue-router'
import { getValuesFromMap } from '#/utils/mapUtils.ts'
import JobAddView from '#/views/JobAddView.vue'
import JobEditView from '#/views/JobEditView.vue'
import JobsView from '#/views/JobsView.vue'
import JobView from '#/views/JobView.vue'
import type { ExtractValues } from '../utilityTypes.ts'

export const JOBS_MAIN_ROUTE_NAME = 'jobs'
export const JOBS_ROUTE_NAME = {
  JOB_LIST: 'job-list',
  JOB_ADD: 'job-add',
  JOB: 'job',
} as const
export const JOB_DETAILS_ROUTE_NAME = {
  JOB_DETAILS: 'job-details',
  JOB_EDIT: 'job-edit',
} as const

type JobDetailsRouteName = ExtractValues<typeof JOB_DETAILS_ROUTE_NAME>
type JobsRouteName = ExtractValues<typeof JOBS_ROUTE_NAME>

export const jobDetailsRouteMap = new Map<JobDetailsRouteName, RouteRecordRaw>([
  [
    JOB_DETAILS_ROUTE_NAME.JOB_DETAILS,
    { path: '', name: JOB_DETAILS_ROUTE_NAME.JOB_DETAILS, component: JobView },
  ],
  [
    JOB_DETAILS_ROUTE_NAME.JOB_EDIT,
    { path: 'edit', name: JOB_DETAILS_ROUTE_NAME.JOB_EDIT, component: JobEditView },
  ],
])

export const jobsRouteMap = new Map<JobsRouteName, RouteRecordRaw>([
  [JOBS_ROUTE_NAME.JOB_LIST, { path: '', name: JOBS_ROUTE_NAME.JOB_LIST, component: JobsView }],
  [JOBS_ROUTE_NAME.JOB_ADD, { path: 'add', name: JOBS_ROUTE_NAME.JOB_ADD, component: JobAddView }],
  [
    JOBS_ROUTE_NAME.JOB,
    { path: ':id', name: JOBS_ROUTE_NAME.JOB, children: getValuesFromMap(jobDetailsRouteMap) },
  ],
])

const jobsRouteRecord: RouteRecordRaw = {
  path: '/jobs',
  name: JOBS_MAIN_ROUTE_NAME,
  children: getValuesFromMap(jobsRouteMap),
}

export default jobsRouteRecord
