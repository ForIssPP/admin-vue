<template>
  <el-table-column :label="payName" prop="type" align="center">
    <template slot-scope="{row}">
      <span>{{ row.type }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-pay-type",
  props: {
    payName: {
      type: String
    }
  }
};
</script>
