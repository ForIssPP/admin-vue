<template>
  <el-table-column label="状态" prop="state" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span
        :class="row.check_state === '0' ? 'state-success' : row.check_state === '2' ? 'state-danger' : 'state-warning'"
      >{{ row.check_state === '0' ? '正常' : row.check_state === '2' ? '删除' : '已下架' }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-state-activity",
  props: {
    width: {
      type: String,
      default: "80"
    },
    sortable: {
      type: [Boolean, String],
      validator(value) {
        return typeof value === "boolean" || value === "custom ";
      },
      default: false
    }
  }
};
</script>
