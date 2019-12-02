<template>
  <el-select
    v-model="stateTackleType"
    placeholder="处理状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in stateTackleTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-state-tackle",
  data() {
    return {
      stateTackleType: undefined,
      stateTackleTypeOptions: ["已处理", "未处理"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "stateTackle", this.stateTackleType);
    }
  }
};
</script>
