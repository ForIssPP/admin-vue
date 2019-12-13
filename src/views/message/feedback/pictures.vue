<template>
  <!-- Picture Check -->
  <el-table-column label="图片" prop="img" align="center">
    <template slot-scope="{row}">
      <img width="100%" v-for="(src, index) in row.img" :key="index" :src="src" alt="tip-off-images" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "tipOffImagesTableColumn"
};
</script>
