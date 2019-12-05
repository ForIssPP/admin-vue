import request from "@/utils/request";
import richpapaRequest from "@/utils/richpapa-request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}

export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: {
      token
    }
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}

export function getReviewerUserList(reviewerUserList) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserList",
      reviewerUserList
    }
  });
}

export function getUserList(query) {
  query.service = "User.UserList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getAvatarList(query) {
  query.service = "User.UserAvatarCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getProfilesList(query) {
  query.service = "User.UserIntroductionCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getPictureList(query) {
  query.service = "User.UserWomanAuthList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getAlbumList(query) {
  query.service = "User.UserPhotoCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getMoneyPicturesList(query) {
  query.service = "User.UserManAuthList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function getFeedBack(query) {
  return request({
    url: "/user/tipoffs/feedback",
    method: "get",
    params: query
  });
}

export function getTipOffsList(query) {
  return request({
    url: "/user/tipoffs/list",
    method: "get",
    params: query
  });
}

export function getUsernameList(query) {
  query.service = "User.UserNicknameCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

export function addUserMan(info) {
  info.service= "User.AddUserMan";
  return richpapaRequest({
    method: "get",
    params: info
  });
}

export function addUserWoman(info) {
  info.service= "User.AddUserWoman";
  return richpapaRequest({
    method: "get",
    params: info
  });
}

export function setUserDetail(uid) {
  return richpapaRequest({
    method: "get",
    params: {
      uid
    }
  });
}

export function setUserAvatarCheck(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserAvatarCheck",
      avatar_id: row.nickname_id,
      state: row.state
    }
  });
}

export function setUserNameCheck(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserNicknameCheck",
      nickname_id: row.nickname_id,
      state: row.state
    }
  });
}

export function setUserWomanAuth(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserWomanAuth",
      nickname_id: row.nickname_id,
      state: row.state
    }
  });
}

export function setUserManAuth(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserManAuth",
      nickname_id: row.nickname_id,
      state: row.state
    }
  });
}

export function setUserPhotoCheck(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserPhotoCheck",
      uid: row.uid,
      state: row.state,
      sort: row.sort
    }
  });
}

export function setUserIntroductionCheck(row) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserIntroductionCheck",
      introduction_id: row.id,
      state: row.state,
    }
  });
}
