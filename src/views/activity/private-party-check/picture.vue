<template>
  <!-- Picture Check -->
  <el-table-column label="图片" prop="activityImage" align="center">
    <template slot-scope="{row}">
      <img :src="row.activityImage" alt="activity-images" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "OfflinePartyCheckImageTableColumn"
};
</script>
