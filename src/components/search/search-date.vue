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
import { parseTime } from '@/utils'

export default {
  name: "search-date",
  data() {
    return {
      choseDates: null
    };
  },
  methods: {
    searchChange() {
      // 返回的是Date对象数组
      if (this.choseDates) {
        const arr = this.getTime();
        this.$emit("searchChange", "start_time", arr[0]);
        this.$emit("searchChange", "end_time", arr[1]);
      }
    },
    getTime() {
      return this.choseDates.map(date => {
        parseTime(date.getTime(), '{y}-{m}-{d}')
        return date;
      });
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
