<template>
  <el-select
    v-model="stateActivityType"
    placeholder="状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option
      v-for="item in stateActivityTypeOptions"
      :key="item[0]"
      :label="item[1]"
      :value="item[0]"
    />
  </el-select>
</template>
<script>
export default {
  name: "search-state-activity",
  data() {
    return {
      stateActivityType: undefined,
      stateActivityTypeOptions: [["1", "正常"], ["2", "已下架"],["3", "删除"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "state", this.stateActivityType);
    }
  }
};
</script>
