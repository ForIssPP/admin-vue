<template>
  <el-select
    v-model="stateType"
    placeholder="状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 100px"
  >
    <el-option v-for="item in stateTypeOptions" :key="item[0]" :label="item[1]" :value="item[0]" />
  </el-select>
</template>
<script>
export default {
  name: "search-state",
  data() {
    return {
      stateType: undefined,
      stateTypeOptions: [["1", "通过"], ["2", "未通过"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "state", this.stateType);
    }
  }
};
</script>
