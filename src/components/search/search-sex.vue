<template>
  <el-select
    v-model="sexType"
    placeholder="性别"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 80px"
  >
    <el-option v-for="item in sexTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-sex",
  data() {
    return {
      sexType: "",
      sexTypeOptions: ["男", "女"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", this.sexType);
    }
  }
};
</script>