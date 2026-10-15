import { createRouter, createWebHistory } from 'vue-router'

import LandingView from '@/views/LandingView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LessonsView from '@/views/LessonsView.vue'
import LessonDetailView from '@/views/LessonDetailView.vue'
import CrudLabView from '@/views/CrudLabView.vue'
import QuizView from '@/views/QuizView.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/quizzes', name: 'quizzes', component: LessonsView },
  { path: '/lessons', redirect: '/quizzes' },
  {
    path: '/quizzes/:id',
    name: 'quiz-set-detail',
    component: LessonDetailView,
    props: true
  },
  { path: '/lessons/:id', redirect: to => `/quizzes/${to.params.id}` },
  { path: '/crud-lab', name: 'crud-lab', component: CrudLabView },
  {
    path: '/quiz/:quizSetId',
    name: 'quiz',
    component: QuizView,
    props: true
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router