import request from "@/utils/request";

export function getOfflinePartyList(data) {
  return request({
    url: "/activity/offlineparty/list",
    method: "get",
    data
  });
}

export function getActivityCheckList(data) {
  return request({
    url: "/activity/offlineparty/list",
    method: "get",
    data
  });
}

export function getPrivateParty(data) {
  return request({
    url: "/activity/offlineparty/list",
    method: "get",
    data
  });
}
