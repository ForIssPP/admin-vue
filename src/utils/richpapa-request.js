import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";

const pro_service = axios.create({
  /* URL */
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

pro_service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Token"] = getToken();
    }
    return config;
  },
  error => {
    Message({
      message: "服务器错误！",
      type: "error",
      duration: 5 * 1000
    });
    console.log(error);
    return Promise.reject(error);
  }
);

pro_service.interceptors.response.use(
  res => {
    const { data } = res;
    if (data && data.ret === 200) {
      if (data.data.code === 0) {
        return data.data.info;
      } else {
        Message({
          message: data.data.msg || "请求出错！",
          type: "error",
          duration: 5 * 1000
        });
        return Promise.reject(data.data);
      }
    } else {
      Message({
        message: data ? data.msg : "请求出错！",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(data);
    }
  },
  err => {
    if (err.message === "timeout of 5000ms exceeded") {
      err.message = "请求超时，请重试！";
    }
    Message({
      message: err.message ||　"请求超时，请重试！",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(err);
  }
);

/** pichpapa request functional */
export default pro_service;
