<template>
  <!-- Picture Check -->
  <el-table-column label="充值金额" prop="rechargeAmount" align="center">
    <template slot-scope="{row}">
      <span>{{ row.rechargeAmount }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-recharge-type"
};
</script>
