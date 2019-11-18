import routerFactory from "@/utils/router-factory";
import Layout from "@/layout";

const name = ["msgPush", "feedback", "tipOffs"];

export default {
  path: "/message",
  component: Layout,
  redirect: "/message",
  name: "messageController",
  meta: {
    title: "消息管理",
    icon: "message"
  },
  children: [
    ...routerFactory(
      name,
      [
        () => import("@/views/message/push"),
        () => import("@/views/message/feedback"),
        () => import("@/views/message/tip-offs")
      ],
      name,
      ["消息推送", "反馈", "举报"]
    )
  ]
};
