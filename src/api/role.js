import request from "@/utils/request";
import richpapaRequest from "@/utils/richpapa-request";

export function getRoutes() {
  return richpapaRequest({
    method: "get",
    params: {
      service: "Login.AllPowerList"
    }
  });
}

export function getRoles() {
  return richpapaRequest({
    method: "get",
    params: {
      service: "System.RoleList"
    }
  });
}

export function getRolePowerList(role_id) {
  return richpapaRequest({
    method: "get",
    params: {
      service: "System.RolePowerList",
      role_id
    }
  });
}

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

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: "delete"
  });
}
