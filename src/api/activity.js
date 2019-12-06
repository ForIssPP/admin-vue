import richpapaRequest from "@/utils/richpapa-request";

export function getOfflinePartyList(query) {
  query.service = "Square.PartyList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getActivityCheckList(query) {
  query.service = "Square.DynamicList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getPrivateParty(query) {
  query.service = "Square.AppointmentList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

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
