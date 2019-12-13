<template>
  <el-table-column label="兑换爱豆" prop="coin" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.coin }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-coin",
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
