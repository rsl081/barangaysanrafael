import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pages',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          beforeEnter: AuthGuard,
        },
        // Resident Records
        {
          name: 'Resident Records',
          path: '/residentrecords',
          component: () => import('@/views/dashboard/ResidentRecords'),
          beforeEnter: AuthGuard,
        },
        // Blotter Records
        {
          name: 'Blotter Records',
          path: '/blotterrecords',
          component: () => import('@/views/dashboard/BlotterRecords'),
          beforeEnter: AuthGuard,
        },
        {
          name: 'Event',
          path: 'event',
          component: () => import('@/views/dashboard/Event'),
          beforeEnter: AuthGuard,
        },
        {
          name: 'About',
          path: 'about',
          component: () => import('@/views/dashboard/About'),
          beforeEnter: AuthGuard,
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
