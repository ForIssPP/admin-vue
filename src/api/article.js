import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function getAvatarList(query) {
  return request({
    url: '/api/user/check/avatar',
    method: 'get',
    params: query
  })
}

export function getProfilesList(query) {
  return request({
    url: '/api/user/check/profiles',
    method: 'get',
    params: query
  })
}

export function getPictureList(query) {
  return request({
    url: '/api/user/check/picture',
    method: 'get',
    params: query
  })
}

export function getMoneyPicturesList(query) {
  return request({
    url: '/api/user/check/moneypictures',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
