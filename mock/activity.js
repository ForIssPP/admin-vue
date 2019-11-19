import Mock from "mockjs";

const offlineList = [];
const dataList = {
  id: "@increment",
  username: "@cname",
  profiles: "@sentence",
  reviewer: ["admin", "Siykt", "King", "Bill"],
  phoneNumber: /1[345789][0-9]{9}/,
  sex: ["男", "女"],
  vip: ["会员", "非会员"],
  platform: ["安卓", "IOS"],
  numberState: ["冻结", "正常"],
  time: "@datetime(yyyy-mm-dd HH:mm:ss)",
  userCreateType: ["手机端", "后台"],
  state: ["通过", "未通过", "待审核"],
  pictures: ["@image(50x50, @color, @word)"],
  address: ["台湾", "香港", "澳门", "@county"],
  userCreateType: ["手机端", "后台"],
  tipOffType: [
    "头像/资料虚假",
    "诈骗/广告",
    "恶意骚扰我",
    "发布色情、低俗、暴力内容",
    "其他"
  ],
  tipOffState: ["已处理", "未处理"],
  tipOffMsg: "@cparagraph",
  tipOffImages: ["@image(50x50, @color, @word)"],
  defendant: "@cname",
  vip: ["会员", "非会员"],
  title: "@cparagraph",
  activityText: "@cparagraph",
  activityState: ["正常", "已下架"],
  activityImage: "@image(50x50, @color, @word)"
};
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
