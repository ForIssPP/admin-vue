<template>
  <el-table-column label="审核昵称" prop="checkName" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.checkName }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-check-name",
  props: {
    width: {
      type: String,
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