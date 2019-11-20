<template>
  <el-table-column label="标题" prop="title" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.title }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-title",
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