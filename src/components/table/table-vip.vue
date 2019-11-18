<template>
  <el-table-column label="会员" prop="vip" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.vip }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  props: {
    width: {
      type: String
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