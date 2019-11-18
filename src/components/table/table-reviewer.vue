<template>
  <el-table-column label="处理人" prop="reviewer" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.reviewer }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
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