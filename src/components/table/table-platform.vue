<template>
  <el-table-column label="平台" prop="platform" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{
        row.device === '0' ? '没有设备' : row.device === '1' ? '安卓' : 'iOS'
      }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-platform",
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
