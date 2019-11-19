<template>
  <el-table-column label="状态" prop="activityState" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.activityState }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
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