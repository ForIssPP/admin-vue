<template>
  <el-table-column label="ID" prop="id" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.id }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-id",
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