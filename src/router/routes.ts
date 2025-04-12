import type { RouteRecordRaw } from 'vue-router'
import homeRouteRecord from './homeRouteRecord.ts'
import jobsRouteRecord from './jobsRouteRecord.ts'

export const routes: RouteRecordRaw[] = [homeRouteRecord, jobsRouteRecord]
