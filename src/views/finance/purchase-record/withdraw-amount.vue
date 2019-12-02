<template>
  <!-- Picture Check -->
  <el-table-column label="消费类型" prop="purchaseType" align="center">
    <template slot-scope="{row}">
      <span>{{ row.purchaseType }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-withdraw-amount"
};
</script>
