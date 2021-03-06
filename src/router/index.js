import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理中心', icon: 'dashboard' }
    }]
  },
  {
    path: '/userList',
    component: Layout,
    redirect: '/userList',
    children: [{
      path: 'userList',
      name: 'UserList',
      component: () => import('@/views/userList/index'),
      meta: { title: '用户管理', icon: 'table' }
    }]
  },

  {
    path: '/form',
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    hidden:true,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/auditList',
    component: Layout,
    redirect: '/auditList/entrepreneur',
    name: 'AuditList',
    meta: {
      title: '认证管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'entrepreneur',
        component: () => import('@/views/auditList/entrepreneur/index'), // Parent router-view
        name: 'Entrepreneur',
        meta: { title: '创业者' },
      },
      {
        path: 'investors',
        component: () => import('@/views/auditList/investors/index'), // Parent router-view
        name: 'Investors',
        meta: { title: '投资人' },
      },
      {
        path: 'investmentAgency',
        component: () => import('@/views/auditList/investmentAgency/index'),
        meta: { title: '投资机构' }
      },
      {
        path: 'industry',
        component: () => import('@/views/auditList/industry/index'),
        meta: { title: '企业产业' }
      },
      {
        path: 'service',
        component: () => import('@/views/auditList/service/index'),
        meta: { title: '服务机构' }
      },
      {
        path: 'government',
        component: () => import('@/views/auditList/government/index'),
        meta: { title: '政府协会' }
      },
      {
        path: 'other',
        component: () => import('@/views/auditList/other/index'),
        meta: { title: '其他机构' }
      },
    ]
  },
  {
    path: '/main',
    component: Layout,
    hidden:true,
    redirect: '/main/enterprises',
    name: 'Main',
    meta: {
      title: '主板块',
      icon: 'nested'
    },
    children: [
      {
        path: 'enterprises',
        component: () => import('@/views/main/enterprises/index'), // Parent router-view
        name: 'Enterprises',
        meta: { title: '创业企业' },
      },
      {
        path: 'investors',
        // hidden:true,
        component: () => import('@/views/main/investors/index'), // Parent router-view
        name: 'Investors',
        meta: { title: '投资机构' },
      },

    ]
  },
  {
    path: '/enterprises',
    component: Layout,
    redirect: '/enterprises',
    children: [{
     path: 'enterprises',
     component: () => import('@/views/enterprises/index'), // Parent router-view
     name: 'Enterprises',
     meta: { title: '产业企业',icon: 'table' },
    }]
  },
  {
    path: '/investors',
    component: Layout,
    redirect: '/investors',
    children: [{
      path: 'investors',
      // hidden:true,
      component: () => import('@/views/main/investors/index'), // Parent router-view
      name: 'Investors',
      meta: { title: '投资机构',icon: 'table'},
    }]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner',
    children: [{
      path: 'banner',
      // hidden:true,
      component: () => import('@/views/banner/index'), // Parent router-view
      name: 'Bnner',
      meta: { title: '轮播图',icon: 'table'},
    }]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news',
    children: [{
      path: 'news',
      // hidden:true,
      component: () => import('@/views/news/index'), // Parent router-view
      name: 'News',
      meta: { title: '融资速递',icon: 'table'},
    }]
  },
  {
    path: '/dynamic',
    component: Layout,
    redirect: '/dynamic',
    children: [{
      path: 'dynamic',
      // hidden:true,
      component: () => import('@/views/dynamic/index'), // Parent router-view
      name: 'Dynamic',
      meta: { title: '行业动态',icon: 'table'},
    }]
  },
  {
    path: '/infomation',
    component: Layout,
    redirect: '/infomation',
    children: [{
      path: 'infomation',
      // hidden:true,
      component: () => import('@/views/infomation/index'), // Parent router-view
      name: 'Infomation',
      meta: { title: '企业资讯',icon: 'table'},
    }]
  },
{
    path: '/hotDemand',
    component: Layout,
    redirect: '/hotDemand',
    children: [{
      path: 'hotDemand',
      // hidden:true,
      component: () => import('@/views/hotDemand/index'), // Parent router-view
      name: 'HotDemand',
      meta: { title: '需求管理',icon: 'table'},
    }]
  },

  {
    path: 'external-link',
    hidden:true,
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
