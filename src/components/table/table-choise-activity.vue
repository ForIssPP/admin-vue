<template>
  <el-table-column label="操作" prop="checkUp" :sortable="sortable" align="center" :width="width">
    <template v-slot="{row}">
      <div class="table-choise" v-if="row.check_state === '0'">
        <el-button plain type="warning" size="mini" @click="handleChoise(true, row)">下架</el-button>
      </div>
      <div v-if="row.check_state === '1'">
        <el-button plain type="success" size="mini" @click="handleChoise(false, row)">上架</el-button>
      </div>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-choise-activity",
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
    handleChoise(tag, row) {
      this.$emit("handleChoise", tag, row);
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
