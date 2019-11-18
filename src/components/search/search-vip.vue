<template>
  <el-select
    v-model="vipType"
    placeholder="会员"
    clearable
    @change="vipTypeChange"
    class="filter-item"
    style="width: 80px"
  >
    <el-option v-for="item in vipTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      vipType: "",
      vipTypeOptions: ["会员", "非会员"]
    };
  },
  methods: {
    vipTypeChange() {
      this.$emit("vipTypeChange", this.vipType);
    }
  }
};
</script>