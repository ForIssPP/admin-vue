<template>
  <el-select
    v-model="tipOffsType"
    :placeholder="name"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 140px"
  >
    <el-option
      v-for="(item, index) in tipOffsTypeOptions"
      :key="index"
      :label="item"
      :value="index + 1"
    />
  </el-select>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "举报类型"
    },
    list: {
      type: Array,
      default() {
        return [
          "头像/资料虚假",
          "诈骗/广告",
          "恶意骚扰我",
          "发布色情、低俗、暴力内容",
          "其他"
        ];
      }
    }
  },
  name: "search-tip-off-",
  data() {
    return {
      tipOffsType: undefined,
      tipOffsTypeOptions: this.list
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "type", this.tipOffsType);
    }
  }
};
</script>
