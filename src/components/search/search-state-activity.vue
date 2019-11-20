<template>
  <el-select
    v-model="stateActivityType"
    placeholder="状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in stateActivityTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-state-activity",
  data() {
    return {
      stateActivityType: "",
      stateActivityTypeOptions: ["正常", "已下架"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", this.stateActivityType);
    }
  }
};
</script>