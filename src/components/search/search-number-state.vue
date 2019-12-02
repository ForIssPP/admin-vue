<template>
  <el-select
    v-model="numberStateType"
    placeholder="账号状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in numberStateTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-number-state",
  data() {
    return {
      numberStateType: undefined,
      numberStateTypeOptions: ["正常", "非正常"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "numberState", this.numberStateType);
    }
  }
};
</script>
