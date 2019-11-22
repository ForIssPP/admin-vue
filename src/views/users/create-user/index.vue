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
      <el-form-item label="用户名" prop="name">
        <el-input v-model="createUserForm.name"></el-input>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="createUserForm.sex">
          <el-radio :label="'男'"></el-radio>
          <el-radio :label="'女'"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 会员 -->
      <el-form-item label="会员" prop="vip">
        <el-radio-group v-model="createUserForm.vip">
          <el-radio :label="'会员'"></el-radio>
          <el-radio :label="'非会员'"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 年龄 -->
      <el-form-item label="年龄" prop="age">
        <el-input type="number" max="99" min="0" v-model="createUserForm.age"></el-input>
      </el-form-item>

      <!-- 位置 -->
      <el-form-item label="位置" prop="address">
        <el-select v-model="createUserForm.address" placeholder="请选择用户位置">
          <el-option
            v-for="({label, value}, index) in formConfig.address"
            :key="index"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 电话号 -->
      <el-form-item label="电话号" prop="phoneNumber">
        <el-input max="99" min="0" v-model="createUserForm.phoneNumber"></el-input>
      </el-form-item>

      <!-- 交友目的 -->
      <el-form-item label="交友目的" prop="target">
        <el-select v-model="createUserForm.target" placeholder="交友目的">
          <el-option
            v-for="({label, value}, index) in formConfig.target"
            :key="index"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 男性用户 -->
      <div v-show="createUserForm.sex === '男'">
        <!-- 财产认证 -->
        <el-form-item label="财产认证" prop="authMan">
          <el-select v-model="createUserForm.authMan" placeholder="认证信息">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <!-- 吸烟情况 -->
        <el-form-item label="吸烟情况" prop="somke">
          <el-select v-model="createUserForm.somke" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.somke"
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
        <el-form-item label="所属行业" prop="workMan">
          <el-select v-model="createUserForm.workMan" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.workMan"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 生活品质 -->
        <el-form-item label="生活品质" prop="live">
          <el-select v-model="createUserForm.live" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.live"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <!-- 女性用户 -->
      <div v-show="createUserForm.sex === '女'">
        <!-- 真人认证 -->
        <el-form-item label="真人认证" prop="authWoman">
          <el-select v-model="createUserForm.authWoman" placeholder="认证信息">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <!-- 三围 -->
        <el-form-item label="三围" prop="dimension">
          <el-select v-model="createUserForm.dimension[0]">
            <el-option v-for="item in numbers" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select v-model="createUserForm.dimension[1]">
            <el-option v-for="item in numbers" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select v-model="createUserForm.dimension[2]">
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
        <el-form-item label="职业" prop="workWoman">
          <el-select v-model="createUserForm.workWoman" placeholder="具体情况">
            <el-option
              v-for="({label, value}, index) in formConfig.workWoman"
              :key="index"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="个人介绍" prop="profiles">
        <el-input type="textarea" :rows="4" v-model="createUserForm.profiles" placeholder="请输入内容"></el-input>
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

export default {
  name: "UserControllerCreateUser",                     
  components: { ImageCropper, PanThumb },
  data() {
    const validatorPhoneNumber = (rule, value, callback) => {
      const reg = /[0-9]{6,}/;
      if (!value) {
        return;
      }
      // 错误提示
      if (!reg.test(value)) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };

    return {
      formConfig,
      imagecropperShow: false,
      imagecropperKey: 0,
      numbers: [...Array(100).keys()].slice(1),
      image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",
      createUserForm: {
        name: undefined,
        address: undefined,
        phoneNumber: undefined,
        profiles: undefined,
        age: undefined,
        authMan: undefined,
        target: undefined,
        vip: undefined,
        workWoman: undefined,
        style: undefined,
        height: undefined,
        vip: undefined,
        somke: undefined,
        live: undefined,
        workMan: undefined,
        drink: undefined,
        authWoman: undefined,
        sex: "女",
        dimension: []
      },
      rules: {
        age: [
          { required: true, message: "请输入用户年龄", trigger: "blur" },
          { max: 2, message: "超出年龄限制", trigger: "blur" }
        ],
        phoneNumber: [
          {
            trigger: "blur",
            validator: validatorPhoneNumber
          }
        ],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
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
      const form = this.createUserForm;
      if (form.name && form.age) {
        this.$confirm(`即将创建用户${form.name}`, "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          lockScroll: false,
          type: "warning"
        }).then(() => {
          this.$notify({
            type: "success",
            message: "修改成功!"
          });
          setTimeout(() => this.$router.push("/user/userController"), 1500);
        });
      }
    },
    resetForm() {
      this.$refs["createUserForm"].resetFields();
    }
  }
};
</script>