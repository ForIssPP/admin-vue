<template>
  <el-select
    v-model="sexType"
    placeholder="性别"
    clearable
    @change="sexTypeChange"
    class="filter-item"
    style="width: 80px"
  >
    <el-option v-for="item in sexTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      sexType: "",
      sexTypeOptions: ["男", "女"]
    };
  },
  methods: {
    sexTypeChange() {
      this.$emit("sexTypeChange", this.sexType);
    }
  }
};
</script>