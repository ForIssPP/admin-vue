import Mock from "mockjs";

const List = [];
const count = 100;
const reviewer = ["admin", "Siykt", "King", "Bill"];

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      phoneNumber: /1[345789][0-9]{9}/,
      "sex|1": ["男", "女"],
      "state|1": ["通过", "未通过", "待审核"],
      checkName: "@word",
      "reviewer|1": reviewer
    })
  );
}

const testList = Array(15).fill(null);

const avatarList = [],
  profilesList = [],
  picture = [],
  pictures = [],
  userlist = [],
  tipOffList = [],
  feedBackList = [];

testList.map(() => {
  avatarList.push(
    Mock.mock({
      id: "@increment",
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      phoneNumber: /1[345789][0-9]{9}/,
      "sex|1": ["男", "女"],
      "state|1": ["通过", "未通过", "待审核"],
      "reviewer|1": reviewer,
      oldAvatar: "@image(100x100, @color)",
      checkAvatar: "@image(100x100, @color)"
    })
  );

  profilesList.push(
    Mock.mock({
      id: "@increment",
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      phoneNumber: /1[345789][0-9]{9}/,
      "sex|1": ["男", "女"],
      "state|1": ["通过", "未通过", "待审核"],
      "reviewer|1": reviewer,
      profiles: "@sentence"
    })
  );

  picture.push(
    Mock.mock({
      id: "@increment",
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      phoneNumber: /1[345789][0-9]{9}/,
      "sex|1": ["男", "女"],
      "state|1": ["通过", "未通过", "待审核"],
      "reviewer|1": reviewer,
      picture: "@image(100x100, @color, @word)"
    })
  );

  pictures.push(
    Mock.mock({
      id: "@increment",
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      phoneNumber: /1[345789][0-9]{9}/,
      "sex|1": ["男", "女"],
      "state|1": ["通过", "未通过", "待审核"],
      "reviewer|1": reviewer,
      "pictures|1-5": ["@image(50x50, @color, @word)"]
    })
  );

  userlist.push(
    Mock.mock({
      id: "@increment",
      username: "@cname",
      "numberState|1": ["冻结", "正常"],
      "platform|1": ["安卓", "IOS"],
      "userCreateType|1": ["手机端", "后台"],
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      "vip|1": ["会员", "非会员"],
      "address|1": ["台湾", "香港", "澳门", "@county"],
      phoneNumber: /1[345789][0-9]{9}/,
      "sex|1": ["男", "女"],
      "reviewer|1": reviewer
    })
  );

  feedBackList.push(
    Mock.mock({
      id: "@increment",
      username: "@cname",
      "vip|1": ["会员", "非会员"],
      "tipOffType|1": [
        "头像/资料虚假",
        "诈骗/广告",
        "恶意骚扰我",
        "发布色情、低俗、暴力内容",
        "其他"
      ],
      "tipOffState|1": ["已处理", "未处理"],
      tipOffMsg: "@cparagraph",
      "platform|1": ["安卓", "IOS"],
      "tipOffImages|1-5": ["@image(50x50, @color, @word)"],
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      "reviewer|1": reviewer
    })
  );

  tipOffList.push(
    Mock.mock({
      id: "@increment",
      username: "@cname",
      defendant: "@cname",
      "vip|1": ["会员", "非会员"],
      "tipOffType|1": [
        "头像/资料虚假",
        "诈骗/广告",
        "恶意骚扰我",
        "发布色情、低俗、暴力内容",
        "其他"
      ],
      "tipOffState|1": ["已处理", "未处理"],
      tipOffMsg: "@cparagraph",
      "platform|1": ["安卓", "IOS"],
      "tipOffImages|1-5": ["@image(50x50, @color, @word)"],
      time: "@datetime(yyyy-mm-dd HH:mm:ss)",
      "reviewer|1": reviewer
    })
  );
});

export default [
  // 表单查询接口
  {
    url: "/article/list",
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

      const pageList = List;

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
  },

  {
    url: "/user/check/avatar",
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

      const pageList = avatarList;

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
  },

  {
    url: "/user/check/profiles",
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

      const pageList = profilesList;

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
  },

  {
    url: "/user/check/picture",
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

      const pageList = picture;

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
  },

  {
    url: "/user/check/moneypictures",
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

      const pageList = pictures;

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
  },

  {
    url: "/user/check/album",
    type: "get",
    response: config => {
      const { userName } = config.query;
      if (userName) {
        return {
          code: 20000,
          data: {
            userName,
            items: []
          }
        };
      } else {
        return;
      }
    }
  },

  {
    url: "/user/userlist",
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

      const pageList = userlist;

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
  },

  {
    url: "/user/tipoffs/list",
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

      const pageList = tipOffList;

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
  },

  {
    url: "/user/tipoffs/feedback",
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

      const pageList = feedBackList;

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
  },

  {
    url: "/article/detail",
    type: "get",
    response: config => {
      const { id } = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          };
        }
      }
    }
  },

  {
    url: "/article/pv",
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            {
              key: "PC",
              pv: 1024
            },
            {
              key: "mobile",
              pv: 1024
            },
            {
              key: "ios",
              pv: 1024
            },
            {
              key: "android",
              pv: 1024
            }
          ]
        }
      };
    }
  },

  {
    url: "/article/create",
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  {
    url: "/article/update",
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  }
];
