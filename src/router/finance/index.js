import routerFactory from "@/utils/router-factory";
import Layout from "@/layout";

const name = ["withdrawRecord", "rechargeRecord", "purchaseRecord"];
const children = routerFactory(
  name,
  [
    () => import("@/views/finance/withdraw-record/"),
    () => import("@/views/finance/recharge-record/"),
    () => import("@/views/finance/purchase-record/")
  ],
  name,
  ["提现记录", "充值记录", "消费记录"]
);

export default {
  path: "/finance",
  component: Layout,
  redirect: "/finance",
  name: "FinanceController",
  meta: {
    title: "财务管理",
    icon: "money",
    roles: children.map(c => c.meta.roles[0])
  },
  children
};
