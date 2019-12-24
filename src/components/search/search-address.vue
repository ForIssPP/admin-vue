<template>
  <el-select
    v-model="addressType"
    placeholder="用户地理位置"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 140px"
  >
    <el-option v-for="item in addressTypeOptions" :key="item[0]" :label="item[1]" :value="item[0]" />
  </el-select>
</template>
<script>
export default {
  name: "search-address",
  data() {
    return {
      addressType: undefined,
      addressTypeOptions: [[1, "台湾"], [2, "香港"], [3, "澳门"], [4, "大陆"], [5, "其他"]]
    };
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "city", this.addressType);
    }
  }
};
</script>
