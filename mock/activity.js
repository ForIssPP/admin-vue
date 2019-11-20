import Mock from "mockjs";
import dataList from "./data-list";

const offlineList = [];
const mock = Mock.mock;
const {
  id,
  username,
  profiles,
  reviewer,
  phoneNumber,
  sex,
  platform,
  numberState,
  time,
  userCreateType,
  state,
  pictures,
  address,
  tipOffType,
  tipOffState,
  tipOffMsg,
  tipOffImages,
  defendant,
  vip,
  title,
  activityText,
  activityImage,
  activityState
} = dataList;

Array(15)
  .fill(null)
  .forEach(() => {
    offlineList.push(
      mock({
        id,
        username,
        "address|1": address,
        "sex|1": sex,
        profiles,
        title,
        activityText,
        activityImage,
        time,
        "platform|1": platform,
        "reviewer|1": reviewer,
        "activityState|1": activityState
      })
    );
  });

const GetOfflineParty = {
  url: "/activity/offlineparty/list",
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

    const pageList = offlineList;

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

const GetPrivateParty = {
  url: "/activity/privateparty/list",
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

    const pageList = offlineList;

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

const GetActivityCheckList = {
  url: "/activity/check/list",
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

    const pageList = offlineList;

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

export default [GetOfflineParty, GetActivityCheckList, GetPrivateParty];
