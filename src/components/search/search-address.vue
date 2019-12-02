<template>
  <el-select
    v-model="addressType"
    placeholder="用户地理位置"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 140px"
  >
    <el-option v-for="item in addressTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  name: "search-address",
  data() {
    return {
      addressType: undefined,
      addressTypeOptions: ["台湾", "香港", "澳门", "大陆", "其他"]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "address", this.addressType);
    }
  }
};
</script>
