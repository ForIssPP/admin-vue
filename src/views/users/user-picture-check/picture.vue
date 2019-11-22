<template>
  <el-table-column label="图片" prop="picture" align="center">
    <template slot-scope="{row}">
      <img :src="row.picture" alt="picture" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-picture"
};
</script>