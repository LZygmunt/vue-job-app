import type { RouteRecordRaw } from 'vue-router'
import NotFoundView from '#/views/NotFoundView.vue'

const NOT_FOUND_ROUTE_NAME = 'not-found'

const notFoundRouteRecord: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  name: NOT_FOUND_ROUTE_NAME,
  component: NotFoundView,
}

export default notFoundRouteRecord
