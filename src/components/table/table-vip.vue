<template>
  <el-table-column label="会员" prop="vip" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ Number(row.vip_level) > 0 ? '会员' : '非会员' }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-vip",
  props: {
    width: {
      type: String,
      default: "80"
    },
    sortable: {
      type: [Boolean, String],
      validator(value) {
        return typeof value === "boolean" || value === "custom ";
      },
      default: false
    }
  }
};
</script>
