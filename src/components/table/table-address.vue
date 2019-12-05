<template>
  <el-table-column label="位置" prop="address" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.position }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-address",
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
