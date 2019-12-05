<template>
  <el-table-column label="昵称" prop="defendant" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.defendant }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-name",
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
