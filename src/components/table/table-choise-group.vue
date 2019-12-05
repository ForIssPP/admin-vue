<template>
  <el-table-column label="操作" prop="checkName" :sortable="sortable" align="center" :width="width">
    <template v-slot="{row}">
      <div class="table-choise">
        <el-button plain v-if="row.state === '0'" size="mini" @click="handleChoise('freeze', row)">冻结</el-button>
        <el-button plain v-else size="mini" @click="handleChoise('thaw', row)">解冻</el-button>
        <el-button plain size="mini" @click="handleChoise('see', row)">查看</el-button>
        <el-button plain size="mini" @click="handleChoise('msg', row)">消息</el-button>
        <el-button plain size="mini" @click="handleChoise('edit', row)">编辑</el-button>
      </div>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-choise-group",
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
  .el-button--default.is-plain {
    margin-left: 0;
    margin-bottom: 3px;
  }
}
</style>
