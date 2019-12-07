<template>
  <el-table-column label="提现账号" prop="account_name" align="center">
    <template slot-scope="{row}">
      <span>{{ row.account_name }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "TablePayType"
};
</script>
