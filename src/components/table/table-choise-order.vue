<template>
  <el-table-column label="操作" prop="ChoicePay" :sortable="sortable" align="center" :width="width">
    <template v-slot="{row}">
      <div class="table-choise">
        <el-button
          v-show="row.state !== '1'"
          plain
          size="mini"
          @click="handleChoise('orderFinish', row)"
        >已打款</el-button>
        <el-button
          v-show="row.state === '0'"
          plain
          type="warning"
          size="mini"
          @click="handleChoise(false, row)"
        >驳回</el-button>
        <el-button
          v-show="row.state === '0'"
          plain
          type="success"
          size="mini"
          @click="handleChoise(true, row)"
        >打款</el-button>
      </div>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-choise-order",
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
    handleChoise(state, row) {
      this.$emit("handleChoise", state, row);
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
