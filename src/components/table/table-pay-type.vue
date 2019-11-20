<template>
  <el-table-column
    :label="payName"
    prop="payType"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.payType }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  props: {
    width: {
      type: String
    },
    payName: {
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