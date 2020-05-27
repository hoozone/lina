import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/i18n/i18n'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

const scheme = document.location.protocol
const port = document.location.port ? ':' + document.location.port : ''
const URL = scheme + '//' + document.location.hostname + port

const requireContext = require.context('@/views/', true, /router\.js$/)
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
import UsersRoute from './users'
import AssetsRoute from './assets'
import ApplicationsRoute from './applications'
import PermsRoute from './perms'
import SessionsRoute from './sessions'
import OpsRoutes from './jobcenter'
import TicketsRoutes from './tickets'
import AuditsRoutes from './audits'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 全局路由
export const constantRoutes = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const adminRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: i18n.t('route.Dashboard'), icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/users/',
    name: 'Users',
    meta: {
      title: i18n.t('route.Users'),
      icon: 'users'
    },
    children: UsersRoute
  },
  {
    path: '/assets',
    component: Layout,
    redirect: '/assets/assets/',
    name: 'assets',
    meta: { title: i18n.t('route.Assets'), icon: 'inbox' },
    children: AssetsRoute
  },
  {
    path: '/applications/',
    component: Layout,
    redirect: '/applications/remote-apps/',
    name: 'applications',
    meta: { title: i18n.t('route.Applications'), icon: 'th' },
    children: ApplicationsRoute
  },
  {
    path: '/perms/',
    component: Layout,
    redirect: '/perms/asset-permissions/',
    name: 'Perms',
    meta: { title: i18n.t('route.Perms'), icon: 'edit' },
    children: PermsRoute
  },
  {
    path: '/terminal/',
    component: Layout,
    redirect: '/terminal/session-online/',
    name: 'Sessions',
    meta: { title: i18n.t('route.Sessions'), icon: 'rocket' },
    children: SessionsRoute
  },
  {
    path: '/ops/',
    component: Layout,
    redirect: '/ops/tasks/',
    name: 'JobCenter',
    meta: { title: i18n.t('route.JobCenter'), icon: 'coffee' },
    children: OpsRoutes
  },
  {
    path: '/tickets/',
    component: Layout,
    redirect: '/tickets/tickets/',
    children: TicketsRoutes
  },
  {
    path: '/audits/',
    component: Layout,
    redirect: '/audits/login-log/',
    name: 'Audits',
    meta: { title: i18n.t('route.Audits'), icon: 'history' },
    children: AuditsRoutes
  },
  ...requireContext.keys().map(key => requireContext(key).default),
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/',
    children: [{
      path: 'settings',
      name: 'Settings',
      component: () => import('@/views/settings/index'),
      meta: { title: i18n.t('route.Settings'), icon: 'gears' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
/**
 * user routes
 * the routes that need to be dynamically loaded based on user roles
 */
// 权限路由
export const userRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '/',
    component: Layout,
    redirect: '/assets',
    children: [
      {
        path: 'assets',
        name: 'assets',
        component: () => import('@/userviews/assets/index'),
        meta: { title: i18n.t('route.MyAssets'), icon: 'files-o' }
      }
    ]
  },
  {
    path: '/apps',
    component: Layout,
    redirect: '/apps/remoteapp',
    meta: { title: i18n.t('route.MyApps'), icon: 'th' },
    children: [
      {
        path: '/apps/remoteapp',
        name: 'remoteapp',
        component: () => import('@/userviews/apps/RemoteApp'),
        meta: { title: i18n.t('route.RemoteApp') }
      },
      {
        path: '/apps/database',
        name: 'assets',
        component: () => import('@/userviews/apps/DatabaseApp'),
        meta: { title: i18n.t('route.DatabaseApp') }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: '/users/profile',
        name: 'profile',
        component: () => import('@/userviews/users/index'),
        meta: { title: i18n.t('route.UserProfile'), icon: 'user' }
      }
    ]
  },
  {
    path: '/command-executions',
    component: Layout,
    children: [
      {
        path: '',
        name: 'CommandExecutions',
        component: () => import('@/views/jobcenter/CommandExecution'),
        meta: { title: i18n.t('route.CommandExecutions'), icon: 'terminal' }
      }
    ]
  },
  {
    path: 'external-link1',
    component: Layout,
    children: [
      {
        path: `${URL}/luna/`,
        meta: { title: i18n.t('route.WebTerminal'), icon: 'window-maximize' }
      }
    ]
  },
  {
    path: 'external-link2',
    component: Layout,
    children: [
      {
        path: `${URL}/koko/elfinder/sftp/`,
        meta: { title: i18n.t('route.WebFTP'), icon: 'file' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  base: '/ui/',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
