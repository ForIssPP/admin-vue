import request from "@/utils/request";

export function getPayList(data) {
  return request({
    url: "/config/paylist",
    method: "get",
    data
  });
}
