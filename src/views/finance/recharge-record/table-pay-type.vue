<template>
  <el-table-column :label="'支付类型'" prop="type" align="center">
    <template slot-scope="{row}">
      <span>{{ row.type }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "TablePayType"
};
</script>
