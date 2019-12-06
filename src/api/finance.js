import richpapaRequest from "@/utils/richpapa-request";

export function getWithdrawList(query) {
  query.service = "Finance.CashoutList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getRechargeRecordList(query) {
  query.service = "Finance.RechargeList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getPurchaseRecordList(query) {
  query.service = "Finance.ConsumeList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 提现驳回
 * @param {object} row 列表对象
 */
export function cashoutReject(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Finance.CashoutReject",
      cashout_id: row.uid,
      reason: row.msg
    }
  });
}

/**
 * 提现打款
 * @param {object} row 列表对象
 */
export function cashoutRemit(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Finance.CashoutRemit",
      cashout_id: row.uid
    }
  });
}

/**
 * 手动充值
 * @param {objeck} form 表单信息
 */
export function addUserAmount(form) {
  form.service = "Finance.AddUserAmount";
  return richpapaRequest({
    method: "get",
    params: form
  });
}

export default {};
