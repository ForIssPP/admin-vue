<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">后台管理中心登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- username input -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!-- password input -->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="imgVerify">
        <span class="svg-container">
          <i class="el-icon-picture"></i>
        </span>
        <!-- 图片验证码 input -->
        <el-input
          class="valid-image-input"
          ref="imgVerify"
          v-model="loginForm.imgVerify"
          placeholder="图片验证码"
          name="imgVerify"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
        <img class="verify-img" :src="validImgUrl" alt="valid-image" @click="getValidImgFrom" />
      </el-form-item>
      <!-- Login button -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername, validImginput } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";
import { log } from "util";
import { loginConfig } from "@/config";
import request from "@/utils/request";

export default {
  name: "Login",
  components: { SocialSign },
  data() {
    // 用户名验证
    const validateUsername = (rule, value, callback) => {
      // 错误提示
      if (!validUsername(value)) {
        callback(loginConfig.validErrorMsg.username[0]);
      } else {
        callback();
      }
    };
    // 密码验证
    const validatePassword = (rule, value, callback) => {
      if (!value.length) {
        callback(loginConfig.validErrorMsg.password[0]);
      } else if (value.length < loginConfig.length.password) {
        callback(loginConfig.validErrorMsg.password[1]);
      } else {
        callback();
      }
    };
    // 图片验证码
    const validImgFrom = (rule, value, callback) => {
      if (!value.length) {
        callback(loginConfig.validErrorMsg.img[0]);
      } else if (
        !validImginput(value) ||
        value.length !== loginConfig.length.img
      ) {
        callback(loginConfig.validErrorMsg.img[1]);
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        imgVerify: ""
      },
      validImgUrl: "",
      // 表单提交规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        imgVerify: [
          { required: true, trigger: "blur", validator: validImgFrom }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    this.getValidImgFrom();
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    /**
     * password input 输入功能增强
     */
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        // 如果用户输入Shift + abc 为小写 或 不输入Shift时 ABC为大写时，提示用户大写锁定已开启
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    /**
     * 显示密码
     */
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    /**
     * 登录
     */
    handleLogin() {
      // 验证表单提交规则
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // 调用公共方法 dispatch 验证用户信息
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // 动态加载路由
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 获取URL参数并传送至其他路由
     * @param {object} query URL参数
     */
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    /**
     * 重新获取验证码
     */
    getValidImgFrom() {
      request({
        url: "/user/checkcode",
        method: "get",
        length
      }).then(res => (this.validImgUrl = res.data));
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.el-form-item__error {
  margin-top: 10px;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    margin-bottom: 40px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

div.login-container {
  .valid-image-input {
    width: 40%;
  }
  .verify-img {
    margin: 4px 4px 0 0;
    width: 100px;
    float: right;
  }
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
