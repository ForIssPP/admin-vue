<template>
  <div class="app-container" style="padding: 30px">
    <el-form
      ref="createUserForm"
      :model="createUserForm"
      :rules="rules"
      autocomplete="on"
      label-width="100px"
      class="demo-createUserForm"
    >
      <!-- 用户头像 -->
      <el-form-item label="用户头像" prop="name">
        <div @click="imagecropperShow=true">
          <pan-thumb :image="image" alt="default" />
        </div>
      </el-form-item>

      <!-- 用户名 -->
      <el-form-item label="用户名" prop="nickname">
        <el-input v-model="createUserForm.nickname"></el-input>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="createUserForm.sex">
          <el-radio :label="'1'">男</el-radio>
          <el-radio :label="'2'">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 会员 -->
      <el-form-item label="会员" prop="is_vip">
        <el-radio-group v-model="createUserForm.is_vip">
          <el-radio :label="'1'">会员</el-radio>
          <el-radio :label="'2'">非会员</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 物质交友 -->
      <el-form-item v-show="createUserForm.sex === '2'" label="特殊符号" prop="make_friend">
        <el-tooltip :content="createUserForm.make_friend === '0' ? '点击开启' : '点击关闭'" placement="top">
          <el-switch v-model="createUserForm.make_friend" active-value="1" inactive-value="0"></el-switch>
        </el-tooltip>
      </el-form-item>

      <!-- 年龄 -->
      <el-form-item label="年龄" prop="age">
        <el-input type="number" max="99" min="0" v-model="createUserForm.age"></el-input>
      </el-form-item>

      <!-- 位置 -->
      <el-form-item label="位置" prop="position">
        <el-select v-model="createUserForm.position" placeholder="请选择用户位置">
          <el-option
            v-for="({label, value}, index) in formConfig.position"
            :key="index"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 电话号 -->
      <el-form-item label="电话号" prop="mobile">
        <el-input max="99" min="0" v-model="createUserForm.mobile"></el-input>
      </el-form-item>

      <!-- 交友目的 -->
      <el-form-item label="交友目的" prop="purpose">
        <el-select v-model="createUserForm.purpose" placeholder="交友目的">
          <el-option
            v-for="({label, value}, index) in formConfig.purpose"
            :key="index"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 男性用户 -->
      <div v-show="createUserForm.sex === '1'">
        <!-- 财产认证 -->
        <el-form-item label="财产认证" prop="auth_state">
          <el-select v-model="createUserForm.auth_state" placeholder="认证信息">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <!-- 吸烟情况 -->
        <el-form-item label="吸烟情况" prop="smoke">
          <el-select v-model="createUserForm.smoke" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.smoke"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 喝酒情况 -->
        <el-form-item label="喝酒情况" prop="drink">
          <el-select v-model="createUserForm.drink" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.drink"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 所属行业 -->
        <el-form-item label="所属行业" prop="profession">
          <el-select v-model="createUserForm.profession" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.workMan"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 生活品质 -->
        <el-form-item label="生活品质" prop="life_quality">
          <el-select v-model="createUserForm.life_quality" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.life_quality"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <!-- 女性用户 -->
      <div v-show="createUserForm.sex === '2'">
        <!-- 真人认证 -->
        <el-form-item label="真人认证" prop="auth_state">
          <el-select v-model="createUserForm.auth_state" placeholder="认证信息">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <!-- 三围 -->
        <el-form-item label="三围" prop="measurements">
          <el-select v-model="createUserForm.measurements[0]">
            <el-option v-for="item in numbers" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select v-model="createUserForm.measurements[1]">
            <el-option v-for="item in numbers" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select v-model="createUserForm.measurements[2]">
            <el-option v-for="item in numbers" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <!-- 身高 -->
        <el-form-item label="身高" prop="height">
          <el-select v-model="createUserForm.height" placeholder="单位cm">
            <el-option v-for="item in numbers" :key="item" :label="130 + item + 'cm'" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <!-- 风格 -->
        <el-form-item label="风格" prop="style">
          <el-select v-model="createUserForm.style" placeholder="个人风格">
            <el-option
              v-for="({label, value}, index) in formConfig.style"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 职业 -->
        <el-form-item label="职业" prop="profession">
          <el-select v-model="createUserForm.profession" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.workMan"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <!-- 个人介绍 -->
      <el-form-item label="个人介绍" prop="introduction">
        <el-input
          type="textarea"
          :rows="4"
          v-model="createUserForm.introduction"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">创建</el-button>
        <el-button @click.native.prevent="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 图片上传 -->
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="/user/update/avatar"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>
<script>
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import formConfig from "./config";
import { addUserMan, addUserWoman } from "@/api/user";

export default {
  name: "UserControllerCreateUser",
  components: { ImageCropper, PanThumb },
  data() {
    return {
      formConfig,
      imagecropperShow: false,
      imagecropperKey: 0,
      numbers: [...Array(100).keys()].slice(1),
      image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",
      createUserForm: formConfig.defaultForm,
      rules: {
        age: [{ required: true, message: "请输入用户年龄", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    cropSuccess(jsonData, field) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.image = jsonData.files.avatar;
    },
    close() {
      this.imagecropperShow = false;
    },
    onSubmit() {
      const form = JSON.parse(JSON.stringify(this.createUserForm));
      this.$refs["createUserForm"].validate(valid => {
        if (valid) {
          this.$confirm(`确认创建用户${form.nickname}？`, "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            lockScroll: false,
            type: "warning"
          }).then(() => {
            form.measurements = form.measurements.join(" ");
            const ok = res => {
              this.$notify({
                type: "success",
                message: "创建成功!"
              });
              this.createUserForm.nickname = undefined;
              this.createUserForm.mobile = undefined;
            };
            if (form.sex === "1") {
              addUserMan(form).then(ok);
            } else {
              addUserWoman(form).then(ok);
            }
          });
        }
      });
    },
    resetForm() {
      this.$refs["createUserForm"].resetFields();
    }
  }
};
</script>
