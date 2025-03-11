import type { RouteRecordRaw } from 'vue-router'
import HomeView from '#/views/HomeView.vue'
import JobsView from '#/views/JobsView.vue'
import JobView from '#/views/JobView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/jobs',
    children: [
      {
        path: '',
        name: 'jobs',
        component: JobsView,
      },
      {
        path: ':id',
        name: 'job',
        component: JobView,
      }
    ]
  },
]
