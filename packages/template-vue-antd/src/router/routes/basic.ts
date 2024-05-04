import BaseLayout from '@/layouts/BaseLayout.vue'

export const basicRoutes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/home',
    meta: {
      title: 'Root'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/redirect',
    component: BaseLayout,
    name: 'RedirectTo',
    meta: {
      title: 'RedirectTo',
      hideBreadcrumb: true,
      hideMenu: true
    },
    children: [
      {
        path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
        name: 'RedirectTo',
        component: BaseLayout,
        meta: {
          title: 'RedirectTo',
          hideBreadcrumb: true
        }
      }
    ]
  },
  {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: BaseLayout,
    meta: {
      title: 'ErrorPage',
      hideBreadcrumb: true,
      hideMenu: true
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'ErrorPage',
        component: BaseLayout,
        meta: {
          title: 'ErrorPage',
          hideBreadcrumb: true,
          hideMenu: true
        }
      }
    ]
  }
]
