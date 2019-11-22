<template>
  <el-table-column label="状态" prop="state" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.state }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-state",
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