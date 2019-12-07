import request from "@/utils/request";

export function getFeedBack(query) {
  return request({
    url: "/user/tipoffs/feedback",
    method: "get",
    params: query
  });
}

export function getTipOffsList(query) {
  return request({
    url: "/user/tipoffs/list",
    method: "get",
    params: query
  });
}

export default {}
