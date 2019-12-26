import request from "@/utils/richpapa-request";

export function getPayList() {
  return request({
    method: "get",
    params: {
      service: "Other.PayType"
    }
  });
}
