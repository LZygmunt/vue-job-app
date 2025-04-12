import type { RouteRecordRaw } from 'vue-router'
import homeRouteRecord from './homeRouteRecord.ts'
import jobsRouteRecord from './jobsRouteRecord.ts'
import notFoundRouteRecord from './notFoundRouteRecord.ts'

export const routes: RouteRecordRaw[] = [homeRouteRecord, jobsRouteRecord, notFoundRouteRecord]
