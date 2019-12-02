<template>
  <el-select
    v-model="payStateType"
    placeholder="账号状态"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option v-for="item in payStateTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
import { getPayList } from "@/api/get-config";

export default {
  name: "search-state-finance",
  data() {
    return {
      payStateType: undefined,
      payStateTypeOptions: []
    };
  },
  created() {
    getPayList().then(
      response => (this.payStateTypeOptions = response.data.items)
    );
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "payState", this.payStateType);
    }
  }
};
</script>
