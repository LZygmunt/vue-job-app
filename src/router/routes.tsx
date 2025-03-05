import HomeView from '#/views/HomeView.vue'
import JobsView from '#/views/JobsView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: JobsView,
  },
]
