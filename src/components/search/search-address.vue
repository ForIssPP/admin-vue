<template>
  <el-select
    v-model="addressType"
    placeholder="用户地理位置"
    clearable
    @change="addressTypeChange"
    class="filter-item"
    style="width: 140px"
  >
    <el-option v-for="item in addressTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      addressType: "",
      addressTypeOptions: ["台湾", "香港", "澳门", "大陆", "其他"]
    };
  },
  methods: {
    addressTypeChange() {
      this.$emit("addressTypeChange", this.addressType);
    }
  }
};
</script>