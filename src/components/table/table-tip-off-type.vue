<template>
  <el-table-column
    label="反馈类型"
    prop="tipOffType"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.tipOffType }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "110"
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