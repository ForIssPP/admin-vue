<template>
  <el-select
    v-model="userCreateType"
    placeholder="用户类型"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in userCreateTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-user-create-",
  data() {
    return {
      userCreateType: undefined,
      userCreateTypeOptions: ["后台", "手机端"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "userCreate", this.userCreateType);
    }
  }
};
</script>
