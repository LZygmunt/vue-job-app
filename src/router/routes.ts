import type { RouteRecordRaw } from 'vue-router'
import JobAddView from '#/views/JobAddView.vue'
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
        path: 'add',
        name: 'job-add',
        component: JobAddView,
      },
      {
        path: ':id',
        name: 'job',
        component: JobView,
      },
    ],
  },
]
