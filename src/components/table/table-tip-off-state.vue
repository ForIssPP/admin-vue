<template>
  <el-table-column
    label="处理状态"
    prop="tipOffState"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.state === "0" ? '未处理' : '已处理'  }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-tip-off-state",
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
