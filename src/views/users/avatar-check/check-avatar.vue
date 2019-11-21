<template>
  <!-- Check Avatar -->
  <el-table-column label="待审头像" align="center">
    <template slot-scope="{row}">
      <img :src="row.checkAvatar" alt="check-avatar" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-check-avatar"
};
</script>