<template>
  <!-- Check Avatar -->
  <el-table-column label="待审头像" align="center">
    <template slot-scope="{row}">
      <img
        class="default-image"
        title="点击查看大图"
        :src="row.avatar"
        alt="check-avatar"
        @click="oepn(row)"
      />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-check-avatar",
  methods: {
    oepn(row) {
      this.$emit("openImageDialog", row);
    }
  }
};
</script>
<style lang="scss">
.default-image {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
