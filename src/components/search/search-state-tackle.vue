<template>
  <el-select
    v-model="stateTackleType"
    placeholder="处理状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option
      v-for="item in stateTackleTypeOptions"
      :key="item[0]"
      :label="item[1]"
      :value="item[0]"
    />
  </el-select>
</template>
<script>
export default {
  name: "search-state-tackle",
  data() {
    return {
      stateTackleType: undefined,
      stateTackleTypeOptions: [["1", "已处理"], ["2", "未处理"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "state", this.stateTackleType);
    }
  }
};
</script>
