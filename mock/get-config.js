import Mock from "mockjs";

const mock = Mock.mock;

const getPayList = {
  url: "/config/paylist",
  type: "get",
  response: config => {
    const pageList = ["微信", "支付宝"];
    return {
      code: 20000,
      data: {
        total: pageList.length,
        items: pageList
      }
    };
  }
};

export default [getPayList];
