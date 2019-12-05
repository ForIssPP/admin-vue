<template>
  <el-table-column label="处理人" prop="reviewer" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.admin_id }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-reviewer",
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
