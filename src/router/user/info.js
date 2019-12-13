export default {
  path: "userController",
  component: () => import("@/views/users/user-controller"),
  name: "userController",
  meta: {
    title: "用户详情",
    roles: ["userController"]
  },
  children: [
    {
      path: "userInfoController",
      component: () => import("@/views/users/user-info"),
      name: "userInfoController",
      hidden: true,
      meta: {
        title: "用户信息",
        roles: ["userController"]
      }
    }
  ]
};
