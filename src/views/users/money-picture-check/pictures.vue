<template>
  <!-- Picture Check -->
  <el-table-column label="图片" prop="avatar" align="center">
    <template slot-scope="{row}">
      <img v-for="(picture, index) in row.img" :key="index" :src="picture" alt="old-avatar" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-pictures"
};
</script>
