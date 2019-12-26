import richpapaRequest from "@/utils/richpapa-request";

/**
 * 管理员登陆
 * @param {AxiosRequestConfig.params} data 用户信息
 */
export function richpapaRequestLogin(data) {
  data.service = "Login.Login";
  return richpapaRequest({
    method: "post",
    params: data
  });
}

/**
 * 获取验证码
 */
export function getVerifyImg() {
  return Promise.resolve(
    process.env.VUE_APP_BASE_API + "?service=Login.VerifyImg&time=" +
      new Date().getTime()
  );
}

/**
 * 获取用户权限
 * @param {string} token token
 */
export function richpapaRequestGetInfo(token) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Other.AdminPowerList",
      token
    }
  });
}

/**
 * 用户登出
 * @param {string} token token
 */
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
 * 获取用户详细信息
 * @param {AxiosRequestConfig.params} uid 用户ID
 */
export function getUserDetail(uid) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UserDetail",
      uid
    }
  });
}

/**
 * 获取`提现记录`列表
 * @param {AxiosRequestConfig.params} reviewerUserList 查询参数
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
 * 获取`添加用户男`列表
 * @param {AxiosRequestConfig.params} info 查询参数
 */
export function addUserMan(info) {
  info.service = "User.AddUserMan";
  return richpapaRequest({
    method: "get",
    params: info
  });
}

/**
 * 获取`添加用户女`列表
 * @param {AxiosRequestConfig.params} info 查询参数
 */
export function addUserWoman(info) {
  info.service = "User.AddUserWoman";
  return richpapaRequest({
    method: "get",
    params: info
  });
}

/**
 * 修改`头像审核`状态
 * @param {object} row 列表对象
 * @param {string} state 状态
 */
export function setUserAvatarCheck(row, state) {
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
 * @param {string | number} id 用户ID
 * @param {string | number} state 状态
 * @param {string} type 状态
 */
export function setUpdateUserState(id, state, type) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "User.UpdateUserState",
      uid: id,
      state,
      type
    }
  });
}

export default {};
