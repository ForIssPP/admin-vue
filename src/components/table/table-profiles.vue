<template>
  <el-table-column
    show-overflow-tooltip
    label="审核个人介绍"
    prop="profiles"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.introduction }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-profiles",
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
