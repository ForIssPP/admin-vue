<template>
  <el-table-column label="操作" prop="checkName" :sortable="sortable" align="center" :width="width">
    <template v-slot="{row}">
      <div class="table-choise">
        <el-button
          v-if="row.tipOffState === '未处理'"
          plain
          type="success"
          size="mini"
          @click="handleChoise(true, row)"
        >处理</el-button>
        <el-button v-else plain size="mini" @click="handleChoise(false, row)">已处理</el-button>
        <el-button plain type="warning" size="mini" @click="handleChoise('msg', row)">私信</el-button>
      </div>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-choise-msg",
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
  .el-button--success.is-plain {
    margin-bottom: 3px;
  }
  .el-button--warning.is-plain {
    margin-top: 3px;
    margin-left: 0;
  }
}
</style>
