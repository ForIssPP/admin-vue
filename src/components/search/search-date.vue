<template>
  <div class="search-date">
    <el-date-picker
      clearable
      v-model="choseDates"
      type="daterange"
      style="width: 250px"
      @change="searchChange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  name: "search-date",
  data() {
    return {
      choseDates: undefined
    };
  },
  methods: {
    searchChange() {
      // 返回的是Date对象数组
      if (this.choseDates) {
        this.$emit("searchChange", "date", this.choseDates);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.search-date {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}
</style>
