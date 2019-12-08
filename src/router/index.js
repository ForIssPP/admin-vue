import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* 路由模块 */
import userConctroller from "./user/index";
import messageController from "./message/index";
import activityConctroller from "./activity/index";
import financeConctroller from "./finance/index";

/**
 * 当设置 true 的时候该路由不会再侧边栏出现 如401， login等页面， 或者如一些编辑页面 / edit / 1
 * hidden: true
 *
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 *
 * 当设置 noRedirect  的时候该路由在面包屑导航中不可被点击
 * redirect: 'noRedirect'
 *
 * 设定路由的名字， 一定要填写不然使用 < keep - alive > 时会出现各种问题
 * name:'router-name'
 *
 * 配置
 * meta : {
 *
 * 设置该路由进入的权限， 支持多个权限叠加
 * roles: ['admin','editor']
 *
 * 设置该路由在侧边栏和面包屑中展示的名字
 * title: 'title'
 *
 * 设置该路由的图标
 * icon: 'svg-name'
 *
 * 如果设置为true， 则不会被 < keep - alive > 缓存(默认 false)
 * noCache: true
 *
 * 在 affix 上显示
 * affix: true
 *
 * 在 breadcrumb 上显示
 * breadcrumb: false
 *
 * 活动菜单
 * activeMenu: '/example/list'
 * }
 */

/**
 * 固定路由
 * 没有要求权限的基本页面
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true
  },
  // 主页面
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "dashboard",
        meta: {
          title: "首页",
          icon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: {
          title: "Profile",
          icon: "user",
          noCache: true
        }
      }
    ]
  }
];

// 异步路由
export const asyncRoutes = [
  userConctroller,
  messageController,
  activityConctroller,
  financeConctroller,
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "Permission",
    meta: {
      title: "系统设置",
      icon: "lock",
      // roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "权限管理",
          // roles: ["admin"]
        }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
