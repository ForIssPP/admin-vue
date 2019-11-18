<template>
  <el-select
    v-model="stateTackleType"
    placeholder="处理状态"
    clearable
    @change="stateTackleTypeChange"
    class="filter-item"
    style="width: 100px"
  >
    <el-option v-for="item in stateTackleTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      stateTackleType: "",
      stateTackleTypeOptions: ["已处理", "未处理"]
    };
  },
  methods: {
    stateTackleTypeChange() {
      this.$emit("stateTackleTypeChange", this.stateTackleType);
    }
  }
};
</script>