import {} from "./data-list";

import Mock from "mockjs";
import dataList from "./data-list";

const withdrawalList = [],
  rechargeList = [],
  purchaseList = [];
const mock = Mock.mock;

const {
  id,
  username,
  profiles,
  reviewer,
  sex,
  platform,
  numberState,
  time,
  userCreateType,
  state,
  pictures,
  address,
  defendant,
  vip,
  title,
  coin,
  payType,
  orderState,
  purchaseType,
  orderNumber
} = dataList;

Array(15)
  .fill(null)
  .forEach(() => {
    withdrawalList.push(
      mock({
        id,
        username,
        coin,
        postTime: time,
        withdrawAmount: coin,
        "vip|1": vip,
        withdrawUserId: id,
        "orderState|1": orderState,
        orderNumber,
        "platform|1": platform,
        "reviewer|1": reviewer,
        "payType|1": payType,
        time
      })
    );

    rechargeList.push(
      mock({
        id,
        username,
        coin,
        rechargeAmount: coin,
        "sex|1": sex,
        "platform|1": platform,
        orderNumber,
        "vip|1": vip,
        "orderState|1": orderState,
        "payType|1": payType,
        postTime: time
      })
    );

    purchaseList.push(
      mock({
        id,
        username,
        coin: "@integer(-10000, 0)",
        "sex|1": sex,
        "platform|1": platform,
        orderNumber,
        "vip|1": vip,
        "orderState|1": orderState,
        "payType|1": payType,
        postTime: time,
        "purchaseType|1": purchaseType
      })
    );
  });

const GetWithdrawalList = {
  url: "/finance/withdraw/list",
  type: "get",
  response: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 15,
      sort
    } = config.query;

    const pageList = withdrawalList;

    if (sort === "-id") {
      pageList = pageList.reverse();
    }

    return {
      code: 20000,
      data: {
        total: pageList.length,
        items: pageList.slice(0, limit)
      }
    };
  }
};

const GetRechargeRecordList = {
  url: "/finance/record/rechargelist",
  type: "get",
  response: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 15,
      sort
    } = config.query;

    const pageList = rechargeList;

    if (sort === "-id") {
      pageList = pageList.reverse();
    }

    return {
      code: 20000,
      data: {
        total: pageList.length,
        items: pageList.slice(0, limit)
      }
    };
  }
};

const GetPurchaseRecordList = {
  url: "/finance/record/purchaselist",
  type: "get",
  response: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 15,
      sort
    } = config.query;

    const pageList = purchaseList;

    if (sort === "-id") {
      pageList = pageList.reverse();
    }

    return {
      code: 20000,
      data: {
        total: pageList.length,
        items: pageList.slice(0, limit)
      }
    };
  }
};

export default [GetWithdrawalList, GetRechargeRecordList, GetPurchaseRecordList];
