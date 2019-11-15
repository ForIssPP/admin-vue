const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const checkCodeUrl = 'https://mjliveapp.com/index.php?g=api&m=checkcode&a=index&length=4&font_size=15&width=100&height=42&use_noise=1&use_curve=0&time='
const checkCode = []

const checkCodeMock = {
  url: '/user/checkcode',
  type: 'get',
  response: _ => {
    return {
      code: 20000,
      data: checkCodeUrl + new Date().getTime()
    }
  }
}

const reviewer = [{
  url: '/user/reviewer',
  type: 'get',
  response: config => {
    if (!Number(config.query.reviewerUserList)) {
      return {
        code: 20000,
        data: ["admin", "Siykt", "King", "Bill"]
      }
    } else {
      return {
        code: 0,
        data: []
      }
    }
  }
}]

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const {
        username
      } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '用户名或密码不正确！'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const {
        token
      } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  checkCodeMock,
  ...reviewer
]
