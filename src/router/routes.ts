import type { RouteRecordRaw } from 'vue-router'
import NotFoundView from '#/views/NotFoundView.vue'
import JobEditView from '#/views/JobEditView.vue'
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
        children: [
          {
            path: '',
            name: 'job',
            component: JobView,
          },
          {
            path: 'edit',
            name: 'job-edit',
            component: JobEditView,
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
  },
]
