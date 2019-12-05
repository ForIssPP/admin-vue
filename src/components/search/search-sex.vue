<template>
  <el-select
    v-model="sexType"
    placeholder="性别"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 80px"
  >
    <el-option v-for="item in sexTypeOptions" :key="item[0]" :label="item[1]" :value="item[0]" />
  </el-select>
</template>
<script>
export default {
  name: "search-sex",
  data() {
    return {
      sexType: undefined,
      sexTypeOptions: [["1", "男"], ["2", "女"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "sex", this.sexType);
    }
  }
};
</script>
