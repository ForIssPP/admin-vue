<template>
  <el-select
    v-model="numberStateType"
    placeholder="账号状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option
      v-for="item in numberStateTypeOptions"
      :key="item[0]"
      :label="item[1]"
      :value="item[0]"
    />
  </el-select>
</template>
<script>
export default {
  name: "search-number-state",
  data() {
    return {
      numberStateType: undefined,
      numberStateTypeOptions: [[1, "正常"], [2, "非正常"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "state", this.numberStateType);
    }
  }
};
</script>
