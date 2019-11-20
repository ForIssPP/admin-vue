<template>
  <el-table-column label="提交时间" prop="postTime" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.postTime }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-time-post",
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