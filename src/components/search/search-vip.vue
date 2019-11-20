<template>
  <el-select
    v-model="vipType"
    placeholder="会员"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 80px"
  >
    <el-option v-for="item in vipTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-vip",
  data() {
    return {
      vipType: "",
      vipTypeOptions: ["会员", "非会员"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "vip", this.vipType);
    }
  }
};
</script>