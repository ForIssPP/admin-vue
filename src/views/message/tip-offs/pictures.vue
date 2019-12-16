<template>
  <!-- Picture Check -->
  <el-table-column label="图片" prop="tipOffImages" align="center">
    <template slot-scope="{row}">
      <img width="50px" v-for="(src, index) in row.img" :key="index" :src="src" alt="tip-off-images" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "tipOffImagesTableColumn"
};
</script>
