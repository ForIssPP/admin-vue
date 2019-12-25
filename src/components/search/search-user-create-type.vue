<template>
  <el-select
    v-model="userCreateType"
    placeholder="用户类型"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in userCreateTypeOptions" :key="item[0]" :label="item[1]" :value="item[0]" />
  </el-select>
</template>
<script>
export default {
  name: "search-user-create-",
  data() {
    return {
      userCreateType: undefined,
      userCreateTypeOptions: [[2, "后台"], [1, "手机端"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "type", this.userCreateType);
    }
  }
};
</script>
