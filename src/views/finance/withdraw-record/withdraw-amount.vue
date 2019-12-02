<template>
  <!-- Picture Check -->
  <el-table-column label="提现金额" prop="withdrawAmount" align="center">
    <template slot-scope="{row}">
      <span>{{ row.withdrawAmount }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-withdraw-amount"
};
</script>
