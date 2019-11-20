<template>
  <el-table-column label="操作" prop="ChoicePay" :sortable="sortable" align="center" :width="width">
    <template v-slot="{row}">
      <div class="table-choise">
        <el-button
          v-show="row.orderState === '已完成'"
          plain
          size="mini"
          @click="handleChoise('orderFinish')"
        >已打款</el-button>
        <el-button
          v-show="row.orderState !== '已完成'"
          plain
          type="warning"
          size="mini"
          @click="handleChoise('reject')"
        >驳回</el-button>
        <el-button
          v-show="row.orderState === '未处理'"
          plain
          type="success"
          size="mini"
          @click="handleChoise('goPay')"
        >打款</el-button>
      </div>
    </template>
  </el-table-column>
</template>
<script>
export default {
  props: {
    width: {
      type: String
    },
    sortable: {
      type: [Boolean, String],
      validator(value) {
        return typeof value === "boolean" || value === "custom ";
      },
      default: false
    }
  },
  methods: {
    handleChoise(state) {
      this.$emit("handleChoise", state);
    }
  }
};
</script>
<style lang="scss" scoped>
.table-choise {
  .is-plain {
    margin-bottom: 3px;
  }
  .is-plain {
    margin-top: 3px;
    margin-left: 0;
  }
}
</style>