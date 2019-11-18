<template>
  <el-select
    v-model="numberStateType"
    placeholder="账号状态"
    clearable
    @change="numberStateTypeChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in numberStateTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      numberStateType: "",
      numberStateTypeOptions: ["正常", "非正常"]
    };
  },
  methods: {
    numberStateTypeChange() {
      this.$emit("numberStateTypeChange", this.numberStateType);
    }
  }
};
</script>