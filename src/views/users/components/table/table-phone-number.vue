<template>
  <el-table-column
    label="电话号码"
    prop="phoneNumber"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.phoneNumber }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "150"
    },
    sortable: {
      type: [Boolean, String],
      validator(value) {
        4;
        return typeof value === "boolean" || value === "custom ";
      },
      default: false
    }
  }
};
</script>