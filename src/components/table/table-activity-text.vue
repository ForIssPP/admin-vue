<template>
  <el-table-column label="信息" prop="text" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.text }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-activity-text",
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
