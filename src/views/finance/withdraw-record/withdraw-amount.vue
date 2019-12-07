<template>
  <!-- Picture Check -->
  <el-table-column label="提现金额" prop="money" align="center">
    <template slot-scope="{row}">
      <span>{{ row.money }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-withdraw-amount"
};
</script>
