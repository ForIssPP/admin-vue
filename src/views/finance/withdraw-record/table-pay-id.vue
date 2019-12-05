<template>
  <el-table-column label="提现账号" prop="withdrawUserId" align="center">
    <template slot-scope="{row}">
      <span>{{ row.withdrawUserId }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-pay-id"
};
</script>
