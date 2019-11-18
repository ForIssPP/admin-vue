<template>
  <el-select
    v-model="userCreateTypeType"
    placeholder="用户类型"
    clearable
    @change="userCreateTypeTypeChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in userCreateTypeTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      userCreateTypeType: "",
      userCreateTypeTypeOptions: ["后台", "手机端"]
    };
  },
  methods: {
    userCreateTypeTypeChange() {
      this.$emit("userCreateTypeTypeChange", this.userCreateTypeType);
    }
  }
};
</script>