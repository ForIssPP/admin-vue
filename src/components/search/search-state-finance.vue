<template>
  <el-select
    v-model="payStateType"
    placeholder="支付类型"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 110px"
  >
    <el-option
      v-for="item in payStateTypeOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
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
    getPayList().then(response => (this.payStateTypeOptions = response));
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "type", this.payStateType);
    }
  }
};
</script>
