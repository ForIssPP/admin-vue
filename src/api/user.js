import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getReviewerUserList(reviewerUserList) {
  return request({
    url: "/user/reviewer",
    method: "get",
    params: {
      reviewerUserList
    }
  })
}

export function getUserList(reviewerUserList) {
  return request({
    url: "/user/userlist",
    method: "get",
    params: {
      reviewerUserList
    }
  })
}

export function getAvatarList(query) {
  return request({
    url: '/user/check/avatar',
    method: 'get',
    params: query
  })
}

export function getProfilesList(query) {
  return request({
    url: '/user/check/profiles',
    method: 'get',
    params: query
  })
}

export function getPictureList(query) {
  return request({
    url: '/user/check/picture',
    method: 'get',
    params: query
  })
}

export function getMoneyPicturesList(query) {
  return request({
    url: '/user/check/moneypictures',
    method: 'get',
    params: query
  })
}
