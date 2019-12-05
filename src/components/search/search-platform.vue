<template>
  <el-select
    v-model="platformType"
    placeholder="渠道"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 80px"
  >
    <el-option v-for="item in platformTypeOptions" :key="item[0]" :label="item[1]" :value="item[0]" />
  </el-select>
</template>
<script>
export default {
  name: "search-platform",
  data() {
    return {
      platformType: undefined,
      platformTypeOptions: [["2", "iOS"], ["1", "安卓"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "device", this.platformType);
    }
  }
};
</script>
