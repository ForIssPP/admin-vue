import WithdrawAmount from "./withdraw-amount.vue";
import TablePayType from "./table-pay-type.vue";

export const componentList = [
  "TableId",
  "TableUsername",
  "TableVip",
  WithdrawAmount,
  "TableCoin",
  "TableOrderNumber",
  "TableSex",
  TablePayType,
  "TablePlatform",
  "TableStateOrder",
  "TablePostTime"
];

export const tableHeader = [
  "ID",
  "昵称",
  "会员",
  "充值金额",
  "兑换金币",
  "订单号",
  "性别",
  "支付类型",
  "平台",
  "订单状态",
  "提交时间"
];

export const tableContent = [
  "id",
  "nickname",
  "vip_level",
  "money",
  "coin",
  "orderno",
  "sex",
  "type",
  "orderno",
  "device",
  "create_time"
];
