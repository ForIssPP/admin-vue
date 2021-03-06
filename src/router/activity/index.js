import routerFactory from "@/utils/router-factory";
import Layout from "@/layout";

const name = ["offlinePartyCheck", "activityCheck", "privatePartyCheck"];
const children = routerFactory(
  name,
  [
    () => import("@/views/activity/offline-party-check/"),
    () => import("@/views/activity/activity-check/"),
    () => import("@/views/activity/private-party-check/")
  ],
  name,
  ["线下聚会审核", "动态审核", "私密聚会审核"]
);

export default {
  path: "/activity",
  component: Layout,
  redirect: "/activity",
  name: "ActivityController",
  meta: {
    title: "广场动态",
    icon: "component",
    roles: children.map(c => c.meta.roles[0])
  },
  children
};
