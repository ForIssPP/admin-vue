<template>
  <el-table-column
    label="用户类型"
    prop="userCreateType"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.type === '0' ? 'App端' : '后台' }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-user-create-type",
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
