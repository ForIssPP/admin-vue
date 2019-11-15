<template>
  <div class="search-date">
    <el-date-picker
      clearable
      v-model="choseDates"
      type="daterange"
      style="width: 250px"
      @change="choseDatesChange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      choseDates: ""
    };
  },
  methods: {
    choseDatesChange() {
      // 返回的是Date对象数组
      if (this.choseDates) {
        console.log(this.choseDates);
        this.$emit("choseDatesChange", [this.startDate, this.endDate]);
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