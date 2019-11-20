<template>
  <div class="filter-item count-to">
    <el-col :span="13">{{ name }}</el-col>
    <el-col :span="11">
      <count-to :start-val="0" :end-val="money" :duration="3000" :prefix="'¥'"></count-to>
    </el-col>
  </div>
</template>
<script>
import countTo from "vue-count-to";

export default {
  components: { countTo },
  props: {
    money: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: "总金额统计"
    }
  }
};
</script>
<style lang="scss">
.count-to {
  padding: 0 10px;
  margin-right: 10px;
  width: 200px;
  color: #1890ff;
  font-size: 14px;
  line-height: 36px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;

  div:first-child {
    color: #606266;
  }
}
</style>
