import richpapaRequest from "@/utils/richpapa-request";

/**
 * 获取所有权限列表
 */
export function getRoutes() {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Other.AllPowerList"
    }
  });
}

/**
 * 获取群组列表
 */
export function getRoles() {
  return richpapaRequest({
    method: "get",
    params: {
      service: "System.RoleList"
    }
  });
}

/**
 * 获取`群组权限`列表
 * @param {string} role_id 群组ID
 */
export function getRolePowerList(role_id) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "System.RolePowerList",
      role_id
    }
  });
}

/**
 * 获取`群组管理员`列表
 * @param {string} role_id 群组ID
 */
export function getRoleAdminList(role_id) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "System.RoleAdminList",
      role_id
    }
  });
}

/**
 * 添加`群组`
 * @param {string} name 群组名
 * @param {string} power_ids 群组权限数组
 */
export function addRole(name, power_ids) {
  return richpapaRequest({
    method: "post",
    params: {
      service: "System.AddRole",
      name,
      power_ids
    }
  });
}

/**
 * 添加`群组用户`
 * @param {string} role_id 群组ID
 * @param {string} pwd 群组密码
 */
export function addRoleAdmin(role_id, pwd) {
  return richpapaRequest({
    method: "post",
    params: {
      service: "System.AddRoleAdmin",
      role_id,
      pwd
    }
  });
}

/**
 * 修改`群组`权限
 * @param {string} role_id 群组ID
 * @param {string} power_ids 群组权限数组
 */
export function updateRole(role_id, power_ids) {
  return richpapaRequest({
    method: "post",
    params: {
      service: "System.UpdateRolePower",
      role_id,
      power_ids
    }
  });
}

export function deleteRole(role_id) {
  return richpapaRequest({
    method: "post",
    params: {
      service: "System.DelRole",
      role_id
    }
  });
}
