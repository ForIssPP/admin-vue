<template>
  <!-- Picture Check -->
  <el-table-column label="图片" prop="activityImage" align="center">
    <template slot-scope="{row}">
      <img
        width="50px"
        v-for="(img, index) in row.img"
        :key="index"
        :src="img"
        alt="activity-images"
      />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "OfflinePartyCheckImageTableColumn"
};
</script>
