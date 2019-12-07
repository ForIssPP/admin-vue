import richpapaRequest from "@/utils/richpapa-request";

/**
 * 获取`线下聚会`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getOfflinePartyList(query) {
  query.service = "Square.PartyList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`动态`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getActivityCheckList(query) {
  query.service = "Square.DynamicList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`私密聚会`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getPrivateParty(query) {
  query.service = "Square.AppointmentList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 修改`线下聚会`状态
 * @param {object} row 列表对象
 */
export function setPartyState(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Square.UpdatePartyState",
      target_id: row.id,
      type: row.check_state
    }
  });
}

/**
 * 修改`私密聚会`状态
 * @param {object} row 列表对象
 */
export function setAppointmentState(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Square.UpdateAppointmentState",
      target_id: row.id,
      type: row.check_state
    }
  });
}

/**
 * 修改`动态`状态
 * @param {object} row 列表对象
 */
export function setDynamicState(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Square.UpdateDynamicState",
      target_id: row.id,
      state: row.check_state
    }
  });
}

export default {};
