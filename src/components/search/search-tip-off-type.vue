<template>
  <el-select
    v-model="tipOffsType"
    placeholder="举报类型"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 140px"
  >
    <el-option v-for="item in tipOffsTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-tip-off-",
  data() {
    return {
      tipOffsType: "",
      tipOffsTypeOptions: [
        "头像/资料虚假",
        "诈骗/广告",
        "恶意骚扰我",
        "发布色情、低俗、暴力内容",
        "其他"
      ]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "tipOffs", this.tipOffsType);
    }
  }
};
</script>