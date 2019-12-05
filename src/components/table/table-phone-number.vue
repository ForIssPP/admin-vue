<template>
  <el-table-column
    label="电话号码"
    prop="phoneNumber"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ row.mobile }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-phone-number",
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
