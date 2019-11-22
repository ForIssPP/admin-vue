<template>
  <!-- Old Avatar -->
  <el-table-column label="原头像" align="center">
    <template slot-scope="{row}">
      <img :src="row.oldAvatar" alt="old-avatar" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-old-avatar"
};
</script>