<template>
  <el-select
    v-model="stateType"
    placeholder="状态"
    clearable
    @change="stateTypeChange"
    class="filter-item"
    style="width: 100px"
  >
    <el-option v-for="item in stateTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      stateType: "",
      stateTypeOptions: ["通过", "不通过"]
    };
  },
  methods: {
    stateTypeChange() {
      this.$emit("stateTypeChange", this.stateType);
    }
  }
};
</script>