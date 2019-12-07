import routerFactory from "@/utils/router-factory";
import Layout from "@/layout";

const name = ["msgPush", "feedback", "tipOffs"];
const children = routerFactory(
  name,
  [
    () => import("@/views/message/push"),
    () => import("@/views/message/feedback"),
    () => import("@/views/message/tip-offs")
  ],
  name,
  ["消息推送", "反馈", "举报"]
);

export default {
  path: "/message",
  component: Layout,
  redirect: "/message",
  name: "messageController",
  meta: {
    title: "消息管理",
    icon: "message",
    roles: children.map(c => c.meta.roles[0])
  },
  children
};
