<template>
  <el-table-column label="订单号" prop="orderno" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.orderno }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-order-number",
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
