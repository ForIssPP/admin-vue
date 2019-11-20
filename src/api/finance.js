import request from "@/utils/request";

export function getWithdrawList(data) {
  return request({
    url: "/finance/withdraw/list",
    method: "get",
    data
  });
}

export function getRechargeRecordList(data) {
  return request({
    url: "/finance/record/rechargelist",
    method: "get",
    data
  });
}

export function getPurchaseRecordList(data) {
  return request({
    url: "/finance/record/purchaselist/",
    method: "get",
    data
  });
}
