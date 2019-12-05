<template>
  <el-table-column
    label="帐号状态"
    prop="numberState"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.state === '0' ? '正常' : '冻结' }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-number-state",
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
  }
};
</script>
