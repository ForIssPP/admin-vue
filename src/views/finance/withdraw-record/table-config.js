import WithdrawAmount from "./withdraw-amount.vue";
import TablePayType from "./table-pay-type.vue";
import TablePayId from "./table-pay-id.vue";

export const componentList = [
  "TableId",
  "TableUsername",
  "TableVip",
  "TableCoin",
  WithdrawAmount,
  "TableOrderNumber",
  // TablePayType,
  TablePayId,
  "TablePlatform",
  "TableStateOrder",
  "TablePostTime",
  "TableReviewer",
  "TableTime",
  "TableChoiseOrder"
];

export const tableHeader = [
  "ID",
  "昵称",
  "会员",
  "兑换金币",
  "提现金额",
  "订单号",
  "提现类型",
  "平台",
  "订单状态",
  "提交时间",
  "处理人",
  "修改时间"
];

export const tableContent = [
  "id",
  "nickname",
  "vip_level",
  "coin",
  "money",
  "orderno",
  "type",
  "device",
  "state",
  "create_time",
  "admin_id",
  "time"
];
