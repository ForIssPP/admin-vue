<template>
  <el-select
    v-model="platformType"
    placeholder="渠道"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 80px"
  >
    <el-option v-for="item in platformTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-platform",
  data() {
    return {
      platformType: "",
      platformTypeOptions: ["iOS", "安卓"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "platform", this.platformType);
    }
  }
};
</script>