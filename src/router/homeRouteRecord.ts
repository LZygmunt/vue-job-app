import type { RouteRecordRaw } from 'vue-router'
import HomeView from '#/views/HomeView.vue'

const HOME_MAIN_ROUTE_NAME = 'home'

const homeRouteRecord: RouteRecordRaw = {
  path: '/',
  name: HOME_MAIN_ROUTE_NAME,
  component: HomeView,
}

export default homeRouteRecord
