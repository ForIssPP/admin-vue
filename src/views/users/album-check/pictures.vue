<template>
  <!-- Picture Check -->
  <el-table-column label="图片" prop="photo" align="center">
    <template slot-scope="{row}">
      <img v-if="row.photo.length" style="width: 100%" :src="row.photo[0][0]" alt="photo" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-photo"
};
</script>
