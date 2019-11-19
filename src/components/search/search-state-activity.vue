<template>
  <el-select
    v-model="stateActivityType"
    placeholder="状态"
    clearable
    @change="stateActivityTypeChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in stateActivityTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      stateActivityType: "",
      stateActivityTypeOptions: ["正常", "已下架"]
    };
  },
  methods: {
    stateActivityTypeChange() {
      this.$emit("stateActivityTypeChange", this.stateActivityType);
    }
  }
};
</script>