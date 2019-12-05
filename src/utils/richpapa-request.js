import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";

const pro_service = axios.create({
  baseURL: "http://loc.mjliveapp.com/appapi/",
  timeout: 5000
});

pro_service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

pro_service.interceptors.response.use(
  res => {
    const { data } = res;
    if (data && data.ret === 200 && data.data.code === 0) {
      return data.data.info;
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
    Message({
      message: err.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(err);
  }
);

export default pro_service;
