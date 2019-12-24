<template>
  <el-table-column label="图片" prop="img" align="center">
    <template slot-scope="{row}">
      <img width="100%" :src="row.img[0]" alt="picture" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-picture"
};
</script>
