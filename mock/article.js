import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    time: '@datetime(yyyy-mm-dd HH:mm:ss)',
    phoneNumber: /1[345789][0-9]{9}/,
    'sex|1': ['男', '女'],
    'state|1': ['通过', '未通过', '待审核'],
    checkName: '@word',
    'reviewer|1': ['admin', 'Siykt', 'King', 'Bill']
  }))
}

const testList = Array(15).fill(null)

const avatarList = [],
  profilesList = []

testList.map(() => {
  avatarList.push(Mock.mock({
    id: '@increment',
    time: '@datetime(yyyy-mm-dd HH:mm:ss)',
    phoneNumber: /1[345789][0-9]{9}/,
    'sex|1': ['男', '女'],
    'state|1': ['通过', '未通过', '待审核'],
    'reviewer|1': ['admin', 'Siykt', 'King', 'Bill'],
    oldAvatar: '@image(100x100, @color, @word)',
    checkAvatar: '@image(100x100, @color, @word)'
  }))

  profilesList.push(Mock.mock({
    id: '@increment',
    time: '@datetime(yyyy-mm-dd HH:mm:ss)',
    phoneNumber: /1[345789][0-9]{9}/,
    'sex|1': ['男', '女'],
    'state|1': ['通过', '未通过', '待审核'],
    'reviewer|1': ['admin', 'Siykt', 'King', 'Bill'],
    profiles: '@sentence'
  }))
});



export default [
  // 表单查询接口
  {
    url: '/article/list',
    type: 'get',
    response: config => {
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 15,
        sort
      } = config.query

      const pageList = List

      if (sort === '-id') {
        pageList = pageList.reverse()
      }

      return {
        code: 20000,
        data: {
          total: pageList.length,
          items: pageList.slice(0, limit)
        }
      }
    }
  },

  {
    url: '/api/user/check/avatar',
    type: 'get',
    response: config => {
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 15,
        sort
      } = config.query

      const pageList = avatarList

      if (sort === '-id') {
        pageList = pageList.reverse()
      }

      return {
        code: 20000,
        data: {
          total: pageList.length,
          items: pageList.slice(0, limit)
        }
      }
    }
  },

  {
    url: '/api/user/check/profiles',
    type: 'get',
    response: config => {
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 15,
        sort
      } = config.query

      const pageList = profilesList

      if (sort === '-id') {
        pageList = pageList.reverse()
      }

      return {
        code: 20000,
        data: {
          total: pageList.length,
          items: pageList.slice(0, limit)
        }
      }
    }
  },

  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const {
        id
      } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [{
              key: 'PC',
              pv: 1024
            },
            {
              key: 'mobile',
              pv: 1024
            },
            {
              key: 'ios',
              pv: 1024
            },
            {
              key: 'android',
              pv: 1024
            }
          ]
        }
      }
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
