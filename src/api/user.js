import request from "@/utils/request";
import richpapaRequest from "@/utils/richpapa-request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}

export function richpapaRequestLogin(data) {
  data.service = "Login.Login";
  return richpapaRequest({
    method: "post",
    params: data
  });
}

export function getVerifyImg() {
  return Promise.resolve(
    "http://richpapa-admin.richpapa88.com/public/?service=Login.VerifyImg&time=" +
      new Date().getTime()
  );
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

export function richpapaRequestGetInfo(token) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Login.UserRoles",
      token
    }
  });
}

export function logout(token) {
  return richpapaRequest({
    method: "post",
    params: {
      service: "Login.logout",
      token
    }
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getReviewerUserList(reviewerUserList) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserList",
      reviewerUserList
    }
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getUserList(query) {
  query.service = "User.UserList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getAvatarList(query) {
  query.service = "User.UserAvatarCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getProfilesList(query) {
  query.service = "User.UserIntroductionCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getPictureList(query) {
  query.service = "User.UserWomanAuthList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getAlbumList(query) {
  query.service = "User.UserPhotoCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getMoneyPicturesList(query) {
  query.service = "User.UserManAuthList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function getUsernameList(query) {
  query.service = "User.UserNicknameCheckList";
  return richpapaRequest({
    method: "get",
    params: query
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function addUserMan(info) {
  info.service = "User.AddUserMan";
  return richpapaRequest({
    method: "get",
    params: info
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} query 查询参数
 */
export function addUserWoman(info) {
  info.service = "User.AddUserWoman";
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

/**
 * 修改`头像审核`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUserAvatarCheck(row, state) {
  console.log(row);
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserAvatarCheck",
      avatar_id: row.id,
      state: state
    }
  });
}

/**
 * 修改`昵称审核`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUserNameCheck(row, state) {
  console.log(row);
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserNicknameCheck",
      nickname_id: row.id,
      state: state
    }
  });
}

/**
 * 修改`真人认证	`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUserWomanAuth(row, state) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserWomanAuth",
      auth_id: row.id,
      state: state
    }
  });
}

/**
 * 修改`财产认证`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUserManAuth(row, state) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserManAuth",
      auth_id: row.id,
      state: state
    }
  });
}

/**
 * 修改`相册审核`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUserPhotoCheck(row, state) {
  console.log(row);
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserPhotoCheck",
      uid: row.uid,
      state: state,
      sort: row.sort
    }
  });
}

/**
 * 修改`个人介绍`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUserIntroductionCheck(row, state) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserIntroductionCheck",
      introduction_id: row.id,
      state: state
    }
  });
}

/**
 * 修改`用户解封冻结`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUpdateUserState(row, state) {
  console.log(row);
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UpdateUserState",
      uid: row.id,
      state: state
    }
  });
}

export default {};
