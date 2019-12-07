import info from "./info";
import newPeoples from "./newPeoples";
import check from "./check";
import Layout from "@/layout";

const children = [...check, ...info, ...newPeoples];

export default {
  path: "/user",
  component: Layout,
  redirect: "/user",
  name: "User Controller",
  alwaysShow: true,
  meta: {
    title: "用户管理",
    icon: "peoples",
    roles: children.map(c => c.meta.roles[0])
  },
  children
};
