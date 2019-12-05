<template>
  <el-select
    v-model="vipType"
    placeholder="会员"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in vipTypeOptions" :key="item[0]" :label="item[1]" :value="item[0]" />
  </el-select>
</template>
<script>
export default {
  name: "search-vip",
  data() {
    return {
      vipType: undefined,
      vipTypeOptions: [["1", "会员"], ["2", "非会员"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "is_vip", this.vipType);
    }
  }
};
</script>
