export const loginConfig = {
  length: {
    img: 4,
    password: 6
  },
  validErrorMsg: {
    username: [new Error("用户名不能为空！")],
    password: [new Error("密码不能为空！"), new Error("密码长度少于6位！")],
    img: [new Error("验证码不能为空！"), new Error("请输入正确的图片验证码！")],
  }
}

export const permissionConfig = {
  // roles: ["admin", ""]
}
