<template>
  <el-table-column label="订单号" prop="orderNumber" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.orderNumber }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
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